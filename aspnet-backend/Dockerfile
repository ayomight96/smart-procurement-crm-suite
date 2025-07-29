FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["aspnet-backend/ProcurementAPI.csproj", "aspnet-backend/"]
RUN dotnet restore "aspnet-backend/ProcurementAPI.csproj"
COPY . .
WORKDIR "/src/aspnet-backend"
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ProcurementAPI.dll"]