using Microsoft.AspNetCore.Builder;
using SFC.Bff.Application.Common.Constants;
using SFC.Bff.Application.Common.Enums;
using SFC.Bff.Infrastructure.Delegations;

namespace SFC.Bff.Infrastructure.Extensions;
public static class RemoteApiExtensions
{
    public static RemoteApi MapRemoteApi(this string clientId)
    {
        return clientId switch
        {
            ClientConstants.DATA => RemoteApi.Data,
            ClientConstants.PLAYER => RemoteApi.Player,
            _ => throw new NotImplementedException($"Not implemented Remote Api for Client Id: {clientId}")
        };
    }

    public static string MapClientId(this RemoteApi remoteApi)
    {
        return remoteApi switch
        {
            RemoteApi.Data => ClientConstants.DATA,
            RemoteApi.Player => ClientConstants.PLAYER,
            _ => throw new ArgumentOutOfRangeException(nameof(remoteApi), $"Remote Api: {remoteApi} is out of range.")
        };
    }

    public static IEndpointConventionBuilder WithAccessTokenRetriever(this IEndpointConventionBuilder builder, string clientId)
    {
        RemoteApi api = MapRemoteApi(clientId);

        switch(api)
        {
            case RemoteApi.Data:
                builder.WithAccessTokenRetriever<DataApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Player:
                builder.WithAccessTokenRetriever<PlayerApiDelegationAccessTokenRetriever>();
                break;
            default:
                throw new NotImplementedException($"Not implemented Remote Api for Client Id: {clientId}");
        };

        return builder;
    }
}
