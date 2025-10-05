using Duende.Bff;
using IdentityModel.Client;
using IdentityModel;
using Microsoft.Extensions.Logging;
using SFC.Bff.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using SFC.Bff.Application.Common.Enums;
using SFC.Bff.Infrastructure.Extensions;
using IdentityModel.AspNetCore.AccessTokenManagement;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace SFC.Bff.Infrastructure.Delegations;

public abstract class BaseDelegationAccessTokenRetriever(
    ILogger<BaseDelegationAccessTokenRetriever> logger,
    IHttpClientFactory httpClientFactory,
    IClientAccessTokenCache clientAccessTokenCache,
    IOptions<BffSettings> bffSettings) : DefaultAccessTokenRetriever(logger)
{
    private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;
    private readonly IOptions<BffSettings> _bffSettings = bffSettings;

    private BffSettings BffSettings => _bffSettings.Value;

    public abstract RemoteApi RemoteApi { get; }

    public override async Task<AccessTokenResult> GetAccessToken(AccessTokenRetrievalContext context)
    {
        ArgumentNullException.ThrowIfNull(context);

        AccessTokenResult accessTokenResult = await base.GetAccessToken(context).ConfigureAwait(true);

        BearerTokenResult? bearerTokenResult = accessTokenResult as BearerTokenResult;

        if (bearerTokenResult is not null)
        {
            string? userId = context.HttpContext?.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            return await GetExchangeTokenAsync(bearerTokenResult.AccessToken, userId).ConfigureAwait(true);
        }

        return accessTokenResult;
    }

    private async Task<AccessTokenResult> GetExchangeTokenAsync(string incomingAccessToken, string? userId)
    {
        string clientId = RemoteApi.MapClientId(), accessTokenCacheKey = $"{clientId}_{userId}";

        ClientAccessToken? clientAccessToken =
            await clientAccessTokenCache.GetAsync(accessTokenCacheKey, new ClientAccessTokenParameters(), default).ConfigureAwait(true);

        if (!string.IsNullOrWhiteSpace(clientAccessToken?.AccessToken))
        {
            return new BearerTokenResult(clientAccessToken.AccessToken);
        }

        using HttpClient client = _httpClientFactory.CreateClient();

        DiscoveryDocumentResponse discoveryDocument = await client.GetDiscoveryDocumentAsync(BffSettings.Authority).ConfigureAwait(true);

        if (discoveryDocument.IsError)
        {
            return new AccessTokenRetrievalError($"Token exchanged failed: {discoveryDocument.Error}");
        }

        Api? api = BffSettings.Apis.FirstOrDefault(api => api.TokenExchange.ClientId == clientId);

        if (api is null)
        {
            return new AccessTokenRetrievalError($"Token exchanged failed. Remote Api not found by Client Id: {clientId}");
        }

#pragma warning disable CA2000 // Dispose objects before losing scope
        TokenResponse exchangeResponse = await client.RequestTokenExchangeTokenAsync(new TokenExchangeTokenRequest
        {
            Address = discoveryDocument.TokenEndpoint,
            GrantType = OidcConstants.GrantTypes.TokenExchange,
            ClientId = api.TokenExchange.ClientId,
            ClientSecret = api.TokenExchange.ClientSecret,
            SubjectToken = incomingAccessToken,
            SubjectTokenType = OidcConstants.TokenTypeIdentifiers.AccessToken,
            Scope = api.TokenExchange.Scopes
        }).ConfigureAwait(true);
#pragma warning restore CA2000 // Dispose objects before losing scope

        if (exchangeResponse.IsError)
        {
            return new AccessTokenRetrievalError($"Token exchanged failed: {exchangeResponse.ErrorDescription}");
        }

        if (exchangeResponse.AccessToken is null)
        {
            return new AccessTokenRetrievalError("Token exchanged failed. Access token is null");
        }

        await clientAccessTokenCache
            .SetAsync(accessTokenCacheKey, exchangeResponse.AccessToken, exchangeResponse.ExpiresIn, new ClientAccessTokenParameters())
            .ConfigureAwait(true);

        return new BearerTokenResult(exchangeResponse.AccessToken);
    }
}
