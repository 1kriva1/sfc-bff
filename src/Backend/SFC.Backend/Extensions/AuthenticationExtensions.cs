using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.Primitives;
using SFC.Bff.Infrastructure.Settings;
using SFC.Bff.Infrastructure.Extensions;
using IdentityConstants = SFC.Bff.Application.Common.Constants.IdentityConstants;

namespace SFC.Bff.Extensions;

public static class AuthenticationExtensions
{
    public static void AddAuthentication(this WebApplicationBuilder builder)
    {
        BffSettings settings = builder.Configuration.GetBffSettings();

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            options.DefaultSignOutScheme = OpenIdConnectDefaults.AuthenticationScheme;
        })
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
        {
            options.Cookie.Name = IdentityConstants.COOKIE_NAME;
            options.Cookie.SameSite = SameSiteMode.Strict;
        })
        .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
        {
            options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

            options.Authority = settings.Authority;
            options.ClientId = settings.ClientId;
            options.ClientSecret = settings.ClientSecret;

            // authorixation code flow
            options.ResponseType = "code";

            options.ResponseMode = "query";

            options.CallbackPath = new PathString(string.IsNullOrWhiteSpace(settings.CallbackPath)
                ? IdentityConstants.DEFAULT_CALLBACK_PATH : settings.CallbackPath);
            options.SignedOutCallbackPath = new PathString(string.IsNullOrWhiteSpace(settings.SignedOutCallbackPath)
                ? IdentityConstants.DEFAULT_SIGN_OUT_CALLBACK_PATH : settings.SignedOutCallbackPath);

            // allow create UI
            options.Prompt = "create";

            // get user's claims by calling userinfo endpoint
            options.GetClaimsFromUserInfoEndpoint = true;

            options.MapInboundClaims = false;

            // save tokens values in authentication properties
            options.SaveTokens = true;

            options.Scope.Clear();
            foreach (string scope in settings.Scopes)
            {
                options.Scope.Add(scope);
            }

            options.TokenValidationParameters = new()
            {
                NameClaimType = "name"
            };

            // allow bff redirect to login or registration pages
            options.Events.OnRedirectToIdentityProvider = context =>
            {
                if (context.HttpContext.Request.Query.TryGetValue(IdentityConstants.QUERY_STRING_PROMPT_KEY, out StringValues prompt))
                {
                    context.ProtocolMessage.Prompt = prompt;
                }

                return Task.CompletedTask;
            };
        });        
    }
}
