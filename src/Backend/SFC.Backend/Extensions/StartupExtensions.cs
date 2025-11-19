using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.HttpOverrides;
using SFC.Bff.Application.Common.Constants;
using SFC.Bff.Infrastructure;
using SFC.Bff.Middlewares;

namespace SFC.Bff.Extensions;
public static class StartupExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        builder.Services.AddInfrastructureServices(builder.Configuration);

        builder.Services.AddBffWithEndpoints();

        builder.AddAuthentication();

        builder.Services.AddAuthorization();

        builder.Services.AddHealthChecks();

        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(app);

        app.UseDefaultFiles();

        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseBff();

        app.UseAuthorization();

        if (app.Environment.IsDevelopment())
        {
            app.UseLogIdentityHandler();
        }

        app.MapHealthChecks("/health");

        app.MapRemoteBffApiEndpoint();

        app.MapFallbackToFile(CommonConstants.FallbackFilePath);

        return app;
    }
}