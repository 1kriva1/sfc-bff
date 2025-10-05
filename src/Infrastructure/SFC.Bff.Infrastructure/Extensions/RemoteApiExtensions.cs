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
            ClientConstants.Data => RemoteApi.Data,
            ClientConstants.Player => RemoteApi.Player,
            ClientConstants.Team => RemoteApi.Team,
            ClientConstants.Invite => RemoteApi.Invite,
            ClientConstants.Request => RemoteApi.Request,
            ClientConstants.Scheme => RemoteApi.Scheme,
            ClientConstants.Identity => RemoteApi.Identity,
            _ => throw new NotImplementedException($"Not implemented Remote Api for Client Id: {clientId}")
        };
    }

    public static string MapClientId(this RemoteApi remoteApi)
    {
        return remoteApi switch
        {
            RemoteApi.Data => ClientConstants.Data,
            RemoteApi.Player => ClientConstants.Player,
            RemoteApi.Team => ClientConstants.Team,
            RemoteApi.Invite => ClientConstants.Invite,
            RemoteApi.Request => ClientConstants.Request,
            RemoteApi.Scheme => ClientConstants.Scheme,
            RemoteApi.Identity => ClientConstants.Identity,
            _ => throw new ArgumentOutOfRangeException(nameof(remoteApi), $"Remote Api: {remoteApi} is out of range.")
        };
    }

    public static IEndpointConventionBuilder WithAccessTokenRetriever(this IEndpointConventionBuilder builder, string clientId)
    {
        RemoteApi api = MapRemoteApi(clientId);

        switch (api)
        {
            case RemoteApi.Data:
                builder.WithAccessTokenRetriever<DataApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Player:
                builder.WithAccessTokenRetriever<PlayerApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Team:
                builder.WithAccessTokenRetriever<TeamApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Invite:
                builder.WithAccessTokenRetriever<InviteApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Request:
                builder.WithAccessTokenRetriever<RequestApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Scheme:
                builder.WithAccessTokenRetriever<SchemeApiDelegationAccessTokenRetriever>();
                break;
            case RemoteApi.Identity:
                builder.WithAccessTokenRetriever<IdentityApiDelegationAccessTokenRetriever>();
                break;
            default:
                throw new NotImplementedException($"Not implemented Remote Api for Client Id: {clientId}");
        };

        return builder;
    }
}
