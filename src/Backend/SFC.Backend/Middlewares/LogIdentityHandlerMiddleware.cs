using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using SFC.Bff.Application.Common.Constants;
using System.Text;

namespace SFC.Bff.Middlewares;
public class LogIdentityHandlerMiddleware(RequestDelegate next, ILogger<LogIdentityHandlerMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<LogIdentityHandlerMiddleware> logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path == IdentityConstants.USER_ENDPOINT &&
            (context.User.Identity?.IsAuthenticated ?? false))
        {
            // access token
            string? accessToken = await context
                .GetTokenAsync(OpenIdConnectParameterNames.AccessToken);

            // identity token
            string? identityToken = await context
                .GetTokenAsync(OpenIdConnectParameterNames.IdToken);

            // refresh token
            string? refreshToken = await context
                .GetTokenAsync(OpenIdConnectParameterNames.RefreshToken);

            StringBuilder userClaimsStringBuilder = new();
            foreach (var claim in context.User.Claims)
            {
                userClaimsStringBuilder.AppendLine($"\t Claim type: {claim.Type} - Claim value: {claim.Value}");
            }

            logger.LogInformation("Tokens & Claims: " +
                $"\n Access token: {accessToken} " +
                $"\n\n Identity token: {identityToken} " +
                $"\n\n Refresh token: {refreshToken} " +
                $"\n\n Claims: \n{userClaimsStringBuilder}");
        }

        await _next(context);
    }
}
