#base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
LABEL service="SFC.Bff" author="Kryvoruk Andrii" email="krivorukandrey@gmail.com"
USER root
WORKDIR /app

#restore & build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ENV HUSKY=False
WORKDIR /source
COPY ["Directory.Build.props", "."]
COPY ["nuget.config", "."]
COPY ["src/Backend/SFC.Backend/SFC.Backend.csproj", "src/Backend/SFC.Backend/"]
COPY ["src/Frontend/SFC.Frontend/SFC.Frontend.esproj", "src/Frontend/SFC.Frontend/"]
COPY ["src/Core/SFC.Bff.Domain/SFC.Bff.Domain.csproj", "src/Core/SFC.Bff.Domain/"]
COPY ["src/Core/SFC.Bff.Application/SFC.Bff.Application.csproj", "src/Core/SFC.Bff.Application/"]
COPY ["src/Infrastructure/SFC.Bff.Infrastructure/SFC.Bff.Infrastructure.csproj", "src/Infrastructure/SFC.Bff.Infrastructure/"]
RUN dotnet restore "./src/Backend/SFC.Backend/SFC.Backend.csproj" --property:HUSKY=$HUSKY
COPY [".", "."]
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs
WORKDIR "/source/src/Backend/SFC.Backend"
RUN dotnet build "./SFC.Backend.csproj" --configuration $BUILD_CONFIGURATION --property:HUSKY=$HUSKY --output /app/build

#publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SFC.Backend.csproj" --configuration $BUILD_CONFIGURATION --property:HUSKY=$HUSKY --property:UseAppHost=false --output /app/publish

#final
FROM base AS final
ARG HTTP_PORT=8080
ARG HTTPS_PORT=8081
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE $HTTP_PORT
EXPOSE $HTTPS_PORT

ENTRYPOINT ["bash", "entrypoint.sh"]