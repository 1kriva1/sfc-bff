using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SFC.Bff.Infrastructure.Delegations;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure.UnitTests;
public class InfrastructureRegistrationTests
{
    private readonly ServiceCollection _serviceCollection = new();
    private readonly ServiceProvider _serviceProvider;

    public InfrastructureRegistrationTests()
    {
        IConfiguration configuration = new ConfigurationBuilder()
            .Build();
        _serviceCollection.AddInfrastructureServices(configuration);
        _serviceProvider = _serviceCollection.BuildServiceProvider();
    }

    [Fact]
    [Trait("Registration", "Custom Services")]
    public void InfrastructureRegistration_Execute_CustomServicesAreRegistered()
    {
        // Assert
        Assert.NotNull(_serviceProvider.GetService<IOptions<BffSettings>>());
        Assert.NotNull(_serviceProvider.GetService<DataApiDelegationAccessTokenRetriever>());
        Assert.NotNull(_serviceProvider.GetService<PlayerApiDelegationAccessTokenRetriever>());
    }
}
