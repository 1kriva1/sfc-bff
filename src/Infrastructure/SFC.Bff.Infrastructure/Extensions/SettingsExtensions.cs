using Microsoft.Extensions.Configuration;
using SFC.Bff.Infrastructure.Settings;

namespace SFC.Bff.Infrastructure.Extensions;
public static class SettingsExtensions
{
    public static BffSettings GetBffSettings(this IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(configuration);

        return configuration.GetSection(BffSettings.SectionKey)
                        .Get<BffSettings>()!;
    }
}
