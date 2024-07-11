using Duende.AccessTokenManagement.OpenIdConnect;
using Duende.Bff;
using IdentityModel.AspNetCore.AccessTokenManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using SFC.Bff.Application.Common.Constants;
using SFC.Bff.Application.Common.Enums;
using SFC.Bff.Infrastructure.Delegations;
using SFC.Bff.Infrastructure.Settings;
using SFC.Bff.Infrastructure.UnitTests.Mocks;
using SFC.Bff.Infrastructure.UnitTests.Stubs;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text.Json;

namespace SFC.Bff.Infrastructure.UnitTests.Delegations;
public class ApiDelegationAccessTokenRetrieverTests
{
    private readonly Guid USER_ID = Guid.Parse("{38D9EF25-E935-489F-859A-3E66D226E5B2}");
    private readonly Mock<ILogger<DataApiDelegationAccessTokenRetriever>> _loggerMock = new();
    private readonly Mock<IHttpClientFactory> _httpClientFactoryMock = new();
    private readonly Mock<IClientAccessTokenCache> _clientAccessTokenCacheMock = new();
    private readonly Mock<IOptions<BffSettings>> _bffSettingsMock = new();

    public ApiDelegationAccessTokenRetrieverTests()
    {
        _bffSettingsMock.Setup(x => x.Value).Returns(new BffSettings
        {
            Authority = "https://localhost:7266",
            Apis = [
                new Api {
                    LocalPath = "/api/data",
                    RemoteUrl = "https://localhost:7466/api/data",
                    RequiredToken = TokenType.User,
                    TokenExchange = new ApiTokenExchange{
                        ClientId = "sfc.data",
                        ClientSecret = "secret_sfc_data",
                        Scopes = "sfc.data.full"
                    }
                }
            ]
        });
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldNotExchangeToken()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext(false);

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsNotType<BearerTokenResult>(result);
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldReturnExchangedTokenFromCache()
    {
        // Arrange
        string accessToken = "access_token";
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();
        _clientAccessTokenCacheMock.Setup(_ => _.GetAsync(
                                        $"{ClientConstants.DATA}_{USER_ID}",
                                        It.IsAny<ClientAccessTokenParameters>(),
                                        It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ClientAccessToken { AccessToken = accessToken });

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsType<BearerTokenResult>(result);
        Assert.Equal(accessToken, ((BearerTokenResult)result).AccessToken);
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldReturnAccessTokenRetrievalErrorWhenDiscoveryDocumentHasError()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsType<AccessTokenRetrievalError>(result);
        Assert.Equal("Token exchanged failed: Error connecting to https://localhost:7266/.well-known/openid-configuration. Object reference not set to an instance of an object..",
            ((AccessTokenRetrievalError)result).Error);
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldReturnAccessTokenRetrievalErrorWhenBffSettingsMissApiByClientId()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();

        MockHttpClientFactory();

        _bffSettingsMock.Setup(x => x.Value).Returns(new BffSettings
        {
            Authority = "https://localhost:7266",
            Apis = [
                new Api {
                    TokenExchange = new ApiTokenExchange{
                        ClientId = "sfc.test"
                    }
                }
            ]
        });

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsType<AccessTokenRetrievalError>(result);
        Assert.Equal($"Token exchanged failed. Remote Api not found by Client Id: {ClientConstants.DATA}",
            ((AccessTokenRetrievalError)result).Error);
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldReturnAccessTokenRetrievalErrorWhenExchangeFailed()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();

        MockHttpClientFactory(false);

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsType<AccessTokenRetrievalError>(result);
        Assert.Equal($"Token exchanged failed: ", ((AccessTokenRetrievalError)result).Error);
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldReturnAccessTokenRetrievalErrorWhenExchangeDoesNotHaveAccessToken()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();

        MockHttpClientFactory(true, false);

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsType<AccessTokenRetrievalError>(result);
        Assert.Equal("Token exchanged failed. Access token is null", ((AccessTokenRetrievalError)result).Error);
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldSetExhangedAccessTokenToCache()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();

        MockHttpClientFactory();

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        _clientAccessTokenCacheMock.Verify(mock => mock.SetAsync($"{ClientConstants.DATA}_{USER_ID}",
                                        It.IsAny<string>(),
                                        It.IsAny<int>(),
                                        It.IsAny<ClientAccessTokenParameters>(),
                                        It.IsAny<CancellationToken>()), Times.Once());
    }

    [Fact]
    [Trait("Delegations", "Base")]
    public async Task Delegations_Base_ShouldReturnExchangedAccessToken()
    {
        // Arrange
        AccessTokenRetrievalContext context = BuildAccessTokenRetrievalContext();

        MockHttpClientFactory();

        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Act
        AccessTokenResult result = await retriever.GetAccessToken(context);

        // Assert
        Assert.IsType<BearerTokenResult>(result);
        Assert.Equal("access_token", ((BearerTokenResult)result).AccessToken);
    }

    [Fact]
    [Trait("Delegations", "DataApi")]
    public void Delegations_DataApi_ShouldDataApiReturnRemoteApi()
    {
        // Arrange
        DataApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Assert
        Assert.Equal(RemoteApi.Data, retriever.RemoteApi);
    }

    [Fact]
    [Trait("Delegations", "PlayerApi")]
    public void Delegations_PlayerApi_ShouldPlayerApiReturnRemoteApi()
    {
        // Arrange
        PlayerApiDelegationAccessTokenRetriever retriever = new(_loggerMock.Object, _httpClientFactoryMock.Object,
            _clientAccessTokenCacheMock.Object, _bffSettingsMock.Object);

        // Assert
        Assert.Equal(RemoteApi.Player, retriever.RemoteApi);
    }

    private AccessTokenRetrievalContext BuildAccessTokenRetrievalContext(bool setBearerToken = true)
    {
        Claim claim = new(JwtRegisteredClaimNames.Sub, USER_ID.ToString());

        ClaimsIdentity claimsIdentity = new(new List<Claim> { claim });

        ClaimsPrincipal contextUser = new([claimsIdentity]);

        Mock<IUserTokenManagementService> userTokenManagementServiceMock = new();

        if (setBearerToken)
        {
            userTokenManagementServiceMock.Setup(_ => _.GetAccessTokenAsync(
                                        contextUser,
                                        It.IsAny<UserTokenRequestParameters>(),
                                        It.IsAny<CancellationToken>()))
            .ReturnsAsync(new UserToken { AccessToken = "access_token" });
        }

        Mock<IServiceProvider> serviceProviderMock = new();

        serviceProviderMock.Setup(_ => _.GetService(typeof(IUserTokenManagementService)))
                .Returns(userTokenManagementServiceMock.Object);

        DefaultHttpContext httpContext = new()
        {
            User = contextUser,
            RequestServices = serviceProviderMock.Object,
        };

        return new()
        {
            HttpContext = httpContext,
            ApiAddress = "https://localhost:7466/api/data",
            LocalPath = "/api/data",
            Metadata = new BffRemoteApiEndpointMetadata
            {
                RequiredTokenType = TokenType.User
            },
            UserTokenRequestParameters = new UserTokenRequestParameters()
        };
    }

    private void MockHttpClientFactory(bool isExchangeSuccess = true, bool isExchangeHasAccessToken = true)
    {
        static HttpResponseMessage GetResponse(object document)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = JsonContent.Create(document)
            };
        };

        HttpClient httpClient = new(new NetworkHandlerMock(request =>
        {
            if (request.RequestUri!.AbsoluteUri.Contains("openid-configuration"))
            {
                return GetResponse(DocumentStubs.OPENID_CONFIGURATION);
            }

            if (request.RequestUri.AbsoluteUri.Contains("jwks"))
            {
                return GetResponse(DocumentStubs.DISCOVERY_JWKS);
            }

            if (request.RequestUri.AbsoluteUri.Contains("token"))
            {
                return isExchangeSuccess
                    ? isExchangeHasAccessToken ? GetResponse(DocumentStubs.SUCCESS_TOKEN_RESPONSE) : new HttpResponseMessage(HttpStatusCode.OK)
                    : new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }));

        _httpClientFactoryMock.Setup(_ => _.CreateClient(Options.DefaultName)).Returns(httpClient);
    }
}
