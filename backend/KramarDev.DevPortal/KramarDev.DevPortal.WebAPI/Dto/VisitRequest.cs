namespace KramarDev.DevPortal.WebAPI.Dto;

public record VisitRequest(
    string Path,
    string? Referrer);
