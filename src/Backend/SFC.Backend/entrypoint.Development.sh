#!/bin/sh

set -e

update-ca-certificates

apt-get update

apt-get install -y curl

dotnet run --project /app/src/Backend/SFC.Backend/SFC.Backend.csproj --no-launch-profile