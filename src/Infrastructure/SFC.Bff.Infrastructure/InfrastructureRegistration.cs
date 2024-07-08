using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SFC.Bff.Infrastructure.Delegations;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure;
public static class InfrastructureRegistration
{
    public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // identity
        services.AddAccessTokenManagement();

        // settings
        services.Configure<BffSettings>(configuration.GetSection(BffSettings.SECTION_KEY));

        // access token deligation retrievers
        services.AddSingleton<DataApiDelegationAccessTokenRetriever>();
        services.AddSingleton<PlayerApiDelegationAccessTokenRetriever>();
    }
}
