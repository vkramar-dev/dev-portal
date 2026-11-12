using KramarDev.DevPortal.WebAPI.Dto;

var builder = WebApplication.CreateBuilder(args);

var logapiSecret = builder.Configuration["LogApi:Secret"]
            ?? throw new InvalidOperationException("LogApi:Secret was not found.");

builder.Services.AddSingleton<ILogClient>(sp => {
    var env = sp.GetRequiredService<IHostEnvironment>();

    return new KramarDev.LogPlatform.LogClient.Logger(
        sp.GetRequiredService<IHttpContextAccessor>(),
        Product.PinD,
        logapiSecret,
        env.IsDevelopment() ? "https://localhost:3000" : null);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://programming-in-depth.com", "http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors();

app.MapPost("/api/app/visit", (VisitRequest request, ILogClient logger) => {

    _ = logger.LogAspNetInfoAsync(
        $"Visit: {request.Path}; Referrer: {request.Referrer}",
        Severity.Low,
        SourceType.Backend);

    return Results.NoContent();
});

app.Run();