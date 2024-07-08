using Microsoft.Extensions.Configuration;
using SFC.Bff.Infrastructure.Settings;
using SFC.Bff.Infrastructure.Extensions;
using Duende.Bff;

namespace SFC.Bff.Infrastructure.UnitTests.Extensions;
public class SettingsExtensionsTests
{
    [Fact]
    [Trait("Extension", "Settings")]
    public void Extension_Settings_ShouldGetBffSettings()
    {
        // Arrange
        string authority = "https://localhost:7266",
            clientId = "sfc",
            clientSecret = "secret",
            callbackPath = "/signin-oidc",
            signedOutCallbackPath = "/signout-callback-oidc",
            scope = "profile",
            apiLocalPath = "/api/data",
            apiRemoteUrl = "https://localhost:7466/api/data",
            apiRequiredToken = "User",
            apiTokenExchangeClientId = "sfc.data",
            apiTokenExchangeClientSecret = "sfc.data_secret",
            apiTokenExchangeScopes = "sfc.data.full";
        Dictionary<string, string> initialData = new()
        {
            {"Bff:Authority", authority},
            {"Bff:ClientId", clientId},
            {"Bff:ClientSecret", clientSecret},
            {"Bff:CallbackPath", callbackPath},
            {"Bff:SignedOutCallbackPath", signedOutCallbackPath},
            {"Bff:Scopes:0", scope},
            {"Bff:Apis:0:LocalPath", apiLocalPath},
            {"Bff:Apis:0:RemoteUrl", apiRemoteUrl},
            {"Bff:Apis:0:RequiredToken", apiRequiredToken},
            {"Bff:Apis:0:TokenExchange:ClientId", apiTokenExchangeClientId},
            {"Bff:Apis:0:TokenExchange:ClientSecret", apiTokenExchangeClientSecret},
            {"Bff:Apis:0:TokenExchange:Scopes", apiTokenExchangeScopes},
        };

        IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(initialData!)
            .Build();

        // Act
        BffSettings result = configuration.GetBffSettings();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(authority, result.Authority);
        Assert.Equal(clientId, result.ClientId);
        Assert.Equal(clientSecret, result.ClientSecret);
        Assert.Equal(callbackPath, result.CallbackPath);
        Assert.Equal(signedOutCallbackPath, result.SignedOutCallbackPath);

        Assert.Single(result.Scopes);
        Assert.Equal(scope, result.Scopes.First());

        Assert.Single(result.Apis);
        Api api = result.Apis.First();
        Assert.Equal(apiLocalPath, api.LocalPath);
        Assert.Equal(apiRemoteUrl, api.RemoteUrl);
        Assert.Equal(TokenType.User, api.RequiredToken);
        Assert.Equal(apiTokenExchangeClientId, api.TokenExchange.ClientId);
        Assert.Equal(apiTokenExchangeClientSecret, api.TokenExchange.ClientSecret);
        Assert.Equal(apiTokenExchangeScopes, api.TokenExchange.Scopes);
    }
}