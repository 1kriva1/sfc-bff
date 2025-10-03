using SFC.Bff.Middlewares;

namespace SFC.Bff.Extensions;
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseLogIdentityHandler(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<LogIdentityHandlerMiddleware>();
    }
}
