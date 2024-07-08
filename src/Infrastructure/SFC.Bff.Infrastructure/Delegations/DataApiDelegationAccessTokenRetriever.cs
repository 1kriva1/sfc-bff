using Microsoft.Extensions.Logging;
using SFC.Bff.Infrastructure.Settings;
using Microsoft.Extensions.Options;
using SFC.Bff.Application.Common.Enums;
using IdentityModel.AspNetCore.AccessTokenManagement;

namespace SFC.Bff.Infrastructure.Delegations;
public class DataApiDelegationAccessTokenRetriever(
    ILogger<DataApiDelegationAccessTokenRetriever> logger,
    IHttpClientFactory httpClientFactory,
    IClientAccessTokenCache clientAccessTokenCache,
    IOptions<BffSettings> bffSettings) : BaseDelegationAccessTokenRetriever(logger, httpClientFactory, clientAccessTokenCache, bffSettings)
{
    public override RemoteApi RemoteApi => RemoteApi.Data;
}
