using System.Text;

public class MockHttpMessageHandler : HttpMessageHandler
{
    private static readonly Dictionary<string, string> _mockResponses = new();

    public static void SetMockResponse(string path, string responseJson)
    {
        _mockResponses[path] = responseJson;
    }

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var path = request.RequestUri!.AbsolutePath;

        if (_mockResponses.TryGetValue(path, out var content))
        {
            return Task.FromResult(new HttpResponseMessage(System.Net.HttpStatusCode.OK)
            {
                Content = new StringContent(content, Encoding.UTF8, "application/json")
            });
        }

        return Task.FromResult(new HttpResponseMessage(System.Net.HttpStatusCode.NotFound));
    }
}