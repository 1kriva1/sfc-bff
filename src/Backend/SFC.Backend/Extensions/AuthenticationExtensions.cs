using Microsoft.Extensions.Primitives;
using SFC.Bff.Settings;

namespace SFC.Bff.Extensions;

public static class AuthenticationExtensions
{
    private const string COOKIE_NAME = "sfc-bff";
    private const string QUERY_STRING_PROMPT_KEY = "prompt";

    public static void AddAuthentication(this WebApplicationBuilder builder)
    {
        BffSettings settings = builder.Configuration.GetBffSettings();

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = "cookie";
            options.DefaultChallengeScheme = "oidc";
            options.DefaultSignOutScheme = "oidc";
        }).AddCookie("cookie", options =>
        {
            options.Cookie.Name = COOKIE_NAME;
            options.Cookie.SameSite = SameSiteMode.Strict;
        }).AddOpenIdConnect("oidc", options =>
        {
            options.Authority = settings.Authority;
            options.ClientId = settings.ClientId;
            options.ClientSecret = settings.ClientSecret;

            options.ResponseType = "code";
            options.ResponseMode = "query";

            options.Prompt = "create";

            options.GetClaimsFromUserInfoEndpoint = true;
            options.MapInboundClaims = false;
            options.SaveTokens = true;

            options.Scope.Clear();
            foreach (var scope in settings.Scopes)
            {
                options.Scope.Add(scope);
            }

            options.TokenValidationParameters = new()
            {
                NameClaimType = "name",
                RoleClaimType = "role"
            };

            options.Events.OnRedirectToIdentityProvider = context =>
            {
                if (context.HttpContext.Request.Query.TryGetValue(QUERY_STRING_PROMPT_KEY, out StringValues prompt))
                {
                    context.ProtocolMessage.Prompt = prompt;
                }

                return Task.CompletedTask;
            };
        });
    }
}
