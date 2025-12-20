#!/bin/sh
set -e

./entrypoint.Common.sh
dotnet watch run --project $1 --no-launch-profile