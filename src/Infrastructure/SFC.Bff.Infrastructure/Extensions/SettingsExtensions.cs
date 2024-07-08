using Microsoft.Extensions.Configuration;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure.Extensions;
public static class SettingsExtensions
{
    public static BffSettings GetBffSettings(this IConfiguration configuration)
        => configuration.GetSection(BffSettings.SECTION_KEY)
                        .Get<BffSettings>()!;
}
