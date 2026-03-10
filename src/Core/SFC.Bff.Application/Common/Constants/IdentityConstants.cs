namespace SFC.Bff.Application.Common.Constants;
public static class IdentityConstants
{
    public const string DefaultCallbackPath = "/signin-oidc";
    public const string DefaultSignOutCallbackPath = "/signout-callback-oidc";
    public const string UserEndpoint = "/bff/user";
    public const string CookieName = "sfc-bff";
    public const string QueryStringPromptKey = "prompt";
    public const string DataProtectionKey = "SFC.Bff:DataProtectionKeys";
}