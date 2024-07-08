using System.Net;
using System.Text;

namespace SFC.Bff.Infrastructure.UnitTests.Mocks;
public class NetworkHandlerMock(Func<HttpRequestMessage, HttpResponseMessage> action) : HttpMessageHandler
{
    private enum Behavior
    {
        Throw,
        ReturnError,
        ReturnDocument
    }

    private readonly Exception? _exception = null;
    private readonly Behavior? _behavior = null;
    private readonly HttpStatusCode _statusCode = HttpStatusCode.OK;
    private readonly string? _reason = null;
    private readonly string? _document = null;
    private readonly Func<HttpRequestMessage, string>? _selector = null;
    private readonly Func<HttpRequestMessage, HttpResponseMessage>? _action = action;
    public string MediaType { get; set; } = "application/json";

    public HttpRequestMessage? Request { get; private set; }

    public string? Body { get; private set; }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        Request = request;
        Body = await SafeReadContentFrom(request);

        if (_action != null)
        {
            return _action(request);
        }

        if (_behavior == Behavior.Throw) throw _exception!;

        var response = new HttpResponseMessage(_statusCode);

        if (_behavior == Behavior.ReturnError)
        {
            response.ReasonPhrase = _reason;
        }

        if (_behavior == Behavior.ReturnDocument)
        {
            if (_selector != null)
            {
                response.Content = new StringContent(_selector(request), Encoding.UTF8, MediaType);
            }
            else
            {
                response.Content = new StringContent(_document!, Encoding.UTF8, MediaType);
            }
        }

        return response;
    }

    private static async Task<string> SafeReadContentFrom(HttpRequestMessage request)
    {
        if (request.Content == null) return default!;

        return await request.Content.ReadAsStringAsync();
    }
}
