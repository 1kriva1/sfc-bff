using Duende.Bff.Yarp;
using SFC.Bff.Settings;

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
            foreach (var api in settings.Apis)
            {
                app.MapRemoteBffApiEndpoint(api.LocalPath, api.RemoteUrl!)
                   .RequireAccessToken(api.RequiredToken);
            }
        }
    }
}
