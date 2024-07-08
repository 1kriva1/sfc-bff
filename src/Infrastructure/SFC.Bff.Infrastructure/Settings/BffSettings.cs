using Duende.Bff;

namespace SFC.Bff.Infrastructure.Settings;
public class BffSettings
{
    public const string SECTION_KEY = "Bff";

    public string Authority { get; set; } = default!;

    public string ClientId { get; set; } = default!;

    public string ClientSecret { get; set; } = default!;

    public string CallbackPath { get; set; } = default!;

    public string SignedOutCallbackPath { get; set; } = default!;

    public List<string> Scopes { get; set; } = [];

    public List<Api> Apis { get; set; } = [];
}

public class Api
{
    public string? LocalPath { get; set; }

    public string? RemoteUrl { get; set; }

    public TokenType RequiredToken { get; set; }

    public ApiTokenExchange TokenExchange { get; set; } = default!;
}

public class ApiTokenExchange
{
    public string ClientId { get; set; } = default!;

    public string ClientSecret { get; set; } = default!;

    public string? Scopes { get; set; }
}
