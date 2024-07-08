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
        AccessTokenResult accessTokenResult = await base.GetAccessToken(context);        

        BearerTokenResult? bearerTokenResult = accessTokenResult as BearerTokenResult;

        if (bearerTokenResult is not null)
        {
            string? userId = context.HttpContext?.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            return await GetExchangeToken(bearerTokenResult.AccessToken, userId);
        }

        return accessTokenResult;
    }

    private async Task<AccessTokenResult> GetExchangeToken(string incomingAccessToken, string? userId)
    {
        string clientId = RemoteApi.MapClientId(), accessTokenCacheKey = $"{clientId}_{userId}";

        ClientAccessToken? clientAccessToken = await clientAccessTokenCache.GetAsync(accessTokenCacheKey,
            new ClientAccessTokenParameters(), default);

        if (!string.IsNullOrWhiteSpace(clientAccessToken?.AccessToken))
        {
            return new BearerTokenResult(clientAccessToken.AccessToken);
        }

        HttpClient client = _httpClientFactory.CreateClient();

        DiscoveryDocumentResponse discoveryDocument = await client.GetDiscoveryDocumentAsync(BffSettings.Authority);

        if (discoveryDocument.IsError)
        {
            return new AccessTokenRetrievalError($"Token exchanged failed: {discoveryDocument.Error}");
        }

        Api? api = BffSettings.Apis.FirstOrDefault(api => api.TokenExchange.ClientId == clientId);

        if (api is null)
        {
            return new AccessTokenRetrievalError($"Token exchanged failed. Remote Api not found by Client Id: {clientId}");
        }

        TokenResponse exchangeResponse = await client.RequestTokenExchangeTokenAsync(new TokenExchangeTokenRequest
        {
            Address = discoveryDocument.TokenEndpoint,
            GrantType = OidcConstants.GrantTypes.TokenExchange,
            ClientId = api.TokenExchange.ClientId,
            ClientSecret = api.TokenExchange.ClientSecret,
            SubjectToken = incomingAccessToken,
            SubjectTokenType = OidcConstants.TokenTypeIdentifiers.AccessToken,
            Scope = api.TokenExchange.Scopes
        });

        if (exchangeResponse.IsError)
        {
            return new AccessTokenRetrievalError($"Token exchanged failed: {exchangeResponse.ErrorDescription}");
        }

        if (exchangeResponse.AccessToken is null)
        {
            return new AccessTokenRetrievalError("Token exchanged failed. Access token is null");
        }

        await clientAccessTokenCache.SetAsync(accessTokenCacheKey, exchangeResponse.AccessToken, exchangeResponse.ExpiresIn, new ClientAccessTokenParameters());

        return new BearerTokenResult(exchangeResponse.AccessToken);
    }
}
