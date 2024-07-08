using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using SFC.Bff.Application.Common.Constants;
using SFC.Bff.Application.Common.Enums;
using SFC.Bff.Infrastructure.Extensions;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure.UnitTests.Extensions;
public class RemoteApiExtensionsTests
{
    #region MapRemoteApi

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldMapDataRemoteApi()
    {
        // Act
        RemoteApi result = ClientConstants.DATA.MapRemoteApi();

        // Assert
        Assert.Equal(RemoteApi.Data, result);
    }

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldMapPlayerRemoteApi()
    {
        // Act
        RemoteApi result = ClientConstants.PLAYER.MapRemoteApi();

        // Assert
        Assert.Equal(RemoteApi.Player, result);
    }

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldThrowNotImplementedExceptionWhenMapRemoteApi()
    {
        // Assert
        Assert.Throws<NotImplementedException>(() => "test".MapRemoteApi());
    }

    #endregion MapRemoteApi

    #region MapRemoteApi

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldMapDataClientId()
    {
        // Act
        string result = RemoteApi.Data.MapClientId();

        // Assert
        Assert.Equal(ClientConstants.DATA, result);
    }

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldMapPlayerClientId()
    {
        // Act
        string result = RemoteApi.Player.MapClientId();

        // Assert
        Assert.Equal(ClientConstants.PLAYER, result);
    }

    #endregion MapRemoteApi

    #region WithAccessTokenRetriever

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldWithDataAccessTokenRetriever()
    {
        // Arrange
        IEndpointConventionBuilder endpointBuilder = GetEndpointConventionBuilder();

        // Act
        IEndpointConventionBuilder result = endpointBuilder.WithAccessTokenRetriever(ClientConstants.DATA);

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldWithPlayerAccessTokenRetriever()
    {
        // Arrange
        IEndpointConventionBuilder endpointBuilder = GetEndpointConventionBuilder();

        // Act
        IEndpointConventionBuilder result = endpointBuilder.WithAccessTokenRetriever(ClientConstants.PLAYER);

        // Assert
        Assert.NotNull(result);
    }

    [Fact]
    [Trait("Extension", "RemoteApi")]
    public void Extension_RemoteApi_ShouldThrowNotImplementedExceptionWhenWithAccessTokenRetriever()
    {
        // Arrange
        IEndpointConventionBuilder endpointBuilder = GetEndpointConventionBuilder();

        // Assert
        Assert.Throws<NotImplementedException>(() => endpointBuilder.WithAccessTokenRetriever("test"));
    }

    #endregion WithAccessTokenRetriever

    #region Private

    private static IEndpointConventionBuilder GetEndpointConventionBuilder()
    {
        WebApplicationBuilder appBuilder = WebApplication.CreateBuilder();
        appBuilder.Services.AddControllers();
        using WebApplication application = appBuilder.Build();
        return application.MapControllers();
    }


    #endregion Private
}
