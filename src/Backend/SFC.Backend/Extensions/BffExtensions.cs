using Duende.Bff.Yarp;
using SFC.Bff.Infrastructure.Settings;
using SFC.Bff.Infrastructure.Extensions;
using SFC.Bff.Application.Common;
using SFC.Bff.Infrastructure.Delegations;
using Microsoft.AspNetCore.Builder;

namespace SFC.Bff.Extensions;

public static class BffExtensions
{
    public static void AddBffWithEndpoints(this IServiceCollection services)
    {
        services.AddBff()
                .AddRemoteApis();
    }

    public static void MapRemoteBffApiEndpoint(this WebApplication app)
    {
        BffSettings settings = app.Configuration.GetBffSettings();

        app.MapBffManagementEndpoints();

        if (settings.Apis.Count != 0)
        {
            foreach (Api api in settings.Apis)
            {
                app.MapRemoteBffApiEndpoint(api.LocalPath, api.RemoteUrl!)
                   .RequireAccessToken(api.RequiredToken)
                   .WithAccessTokenRetriever(api.TokenExchange.ClientId);
            }
        }
    }
}
