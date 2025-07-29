using Microsoft.Extensions.Options;
using ProcurementAPI.Models;

var builder = WebApplication.CreateBuilder(args);
// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Bind config to POCO
builder.Services.Configure<ModelServiceOptions>(
    builder.Configuration.GetSection("ModelService"));

// Add HttpClient with named config
builder.Services.AddHttpClient("ModelServiceClient", (sp, client) =>
{
    var options = sp.GetRequiredService<IOptions<ModelServiceOptions>>().Value;
    client.BaseAddress = new Uri(options.BaseUrl);
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowFrontend");

// Enable Swagger middleware
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();