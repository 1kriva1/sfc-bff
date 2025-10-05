using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using SFC.Bff.Application.Common.Constants;
using SFC.Bff.Application.Common.Enums;
using System.Text;

namespace SFC.Bff.Middlewares;
public class LogIdentityHandlerMiddleware(RequestDelegate next, ILogger<LogIdentityHandlerMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<LogIdentityHandlerMiddleware> logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        ArgumentNullException.ThrowIfNull(context);

        if (context.Request.Path == IdentityConstants.UserEndpoint &&
            (context.User.Identity?.IsAuthenticated ?? false))
        {
            // access token
            string? accessToken = await context
                .GetTokenAsync(OpenIdConnectParameterNames.AccessToken).ConfigureAwait(true);

            // identity token
            string? identityToken = await context
                .GetTokenAsync(OpenIdConnectParameterNames.IdToken).ConfigureAwait(true);

            // refresh token
            string? refreshToken = await context
                .GetTokenAsync(OpenIdConnectParameterNames.RefreshToken).ConfigureAwait(true);

            StringBuilder userClaimsStringBuilder = new();
            foreach (var claim in context.User.Claims)
            {
                userClaimsStringBuilder.AppendLine($"\t Claim type: {claim.Type} - Claim value: {claim.Value}");
            }

            Action<ILogger, Exception?> logRequest = LoggerMessage.Define(LogLevel.Information, new EventId((int)RequestId.LogIdentity),
                "Tokens & Claims: " +
                $"\n Access token: {accessToken} " +
                $"\n\n Identity token: {identityToken} " +
                $"\n\n Refresh token: {refreshToken} " +
                $"\n\n Claims: \n{userClaimsStringBuilder}");

            logRequest(logger, null);
        }

        await _next(context).ConfigureAwait(true);
    }
}
