#!/bin/sh

./src/Backend/SFC.Backend/entrypoint.Common.sh
dotnet run --project /app/src/Backend/SFC.Backend/SFC.Backend.csproj --no-launch-profile