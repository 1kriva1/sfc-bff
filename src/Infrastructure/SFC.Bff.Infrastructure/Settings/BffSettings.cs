using Duende.Bff;

namespace SFC.Bff.Infrastructure.Settings;
public class BffSettings
{
    public const string SectionKey = "Bff";

    public string Authority { get; set; } = default!;

    public string ClientId { get; set; } = default!;

    public string ClientSecret { get; set; } = default!;

    public string CallbackPath { get; set; } = default!;

    public string SignedOutCallbackPath { get; set; } = default!;

    public IEnumerable<string> Scopes { get; set; } = [];

    public IEnumerable<Api> Apis { get; set; } = [];
}

public class Api
{
    public string? LocalPath { get; set; }

#pragma warning disable CA1056 // URI-like properties should not be strings
    public string? RemoteUrl { get; set; }
#pragma warning restore CA1056 // URI-like properties should not be strings

    public TokenType RequiredToken { get; set; }

    public ApiTokenExchange TokenExchange { get; set; } = default!;
}

public class ApiTokenExchange
{
    public string ClientId { get; set; } = default!;

    public string ClientSecret { get; set; } = default!;

    public string? Scopes { get; set; }
}
