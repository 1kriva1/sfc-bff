namespace SFC.Bff.Domain.Common;
public abstract class BaseEntity<I>
{
    public I Id { get; set; } = default!;
}
