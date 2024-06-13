using Duende.Bff;

namespace SFC.Bff.Settings
{
  public class BffSettings
  {
    public const string SECTION_KEY = "Bff";

    public string? Authority { get; set; }

    public string? ClientId { get; set; }

    public string? ClientSecret { get; set; }

    public List<string> Scopes { get; set; } = [];

    public List<Api> Apis { get; set; } = [];
  }

  public class Api
  {
    public string? LocalPath { get; set; }

    public string? RemoteUrl { get; set; }

    public TokenType RequiredToken { get; set; }
  }
}
