using SFC.Bff.Settings;

namespace SFC.Bff.Extensions;

public static class SettingsExtensions
{
    public static BffSettings GetBffSettings(this IConfiguration configuration)
        => configuration.GetSection(BffSettings.SECTION_KEY)
                        .Get<BffSettings>()!;
}
