using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SFC.Bff.Application.Common.Constants;
using SFC.Bff.Infrastructure.Delegations;
using SFC.Bff.Infrastructure.Extensions;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure;
public static class InfrastructureRegistration
{
    public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(configuration);

        RedisSettings settings = configuration.GetRedisSettings();

        // data protection
        services.AddDataProtection()
                .SetApplicationName(settings.InstanceName)
                .PersistKeysToStackExchangeRedis(() => configuration.GetRedisDatabase(settings), IdentityConstants.DataProtectionKey);

        // redis
        services.AddRedis(configuration);

        // identity
        services.AddAccessTokenManagement();

        // settings
        services.Configure<BffSettings>(configuration.GetSection(BffSettings.SectionKey));

        // access token deligation retrievers
        services.AddSingleton<DataApiDelegationAccessTokenRetriever>();
        services.AddSingleton<PlayerApiDelegationAccessTokenRetriever>();
        services.AddSingleton<TeamApiDelegationAccessTokenRetriever>();
        services.AddSingleton<InviteApiDelegationAccessTokenRetriever>();
        services.AddSingleton<RequestApiDelegationAccessTokenRetriever>();
        services.AddSingleton<SchemeApiDelegationAccessTokenRetriever>();
    }
}