using Duende.Bff.Yarp;
using SFC.Bff.Settings;
using SFC.Bff.Extensions;

namespace SFC.Bff.Extensions;
public static class StartupExtensions
{
    private const string FALLBACK_FILE_PATH = "/index.html";

    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddBffWithEndpoints();

        builder.AddAuthentication();

        builder.Services.AddAuthorization();

        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        app.UseDefaultFiles();

        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseBff();

        app.UseAuthorization();

        app.MapRemoteBffApiEndpoint();

        app.MapFallbackToFile(FALLBACK_FILE_PATH);

        return app;
    }
}
