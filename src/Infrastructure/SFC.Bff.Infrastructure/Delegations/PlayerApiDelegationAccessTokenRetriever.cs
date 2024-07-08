using IdentityModel.AspNetCore.AccessTokenManagement;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SFC.Bff.Application.Common.Enums;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure.Delegations;
public class PlayerApiDelegationAccessTokenRetriever(
    ILogger<DataApiDelegationAccessTokenRetriever> logger,
    IHttpClientFactory httpClientFactory,
    IClientAccessTokenCache clientAccessTokenCache,
    IOptions<BffSettings> bffSettings) : BaseDelegationAccessTokenRetriever(logger, httpClientFactory, clientAccessTokenCache, bffSettings)
{
    public override RemoteApi RemoteApi => RemoteApi.Player;
}
