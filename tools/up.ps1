# Input parameters
param(
    [string]$Environment = "Development",
    [string]$Mode = "Development",
    [switch]$Build,
    [switch]$Link
)

Write-Host "=== Parameters Received ==="
Write-Host "Environment: $Environment"
Write-Host "Mode: $Mode"
Write-Host "Build: $Build"
Write-Host "Link: $Link"
Write-Host "==========================="

function Down {
    Write-Host "Run Docker Compose down." -ForegroundColor Yellow
    sfc-down
    exit 1
}

$PreScript = "C:/SFC/Bff/sfc-bff/tools/pre-script.ps1"
$PostScript = "C:/SFC/Bff/sfc-bff/tools/post-script.ps1"

# Pre script (building services and bff)
Write-Host "Running pre-up script..." -ForegroundColor Yellow
if (Test-Path $PreScript) {    
    $buildParams = @{}

    if ($Build) {
        $buildParams.Build = $true
    }

    & $PreScript @buildParams

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Pre-up script is finished successfully." -ForegroundColor Green
    } else {
        Write-Host "Pre-up script is finished unsuccessfully." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Pre-script not found, skipping." -ForegroundColor Yellow
}

# Docker compose UP
Write-Host "Starting Docker Compose..." -ForegroundColor Yellow
& "docker-compose" --env-file "C:/SFC/Bff/sfc-bff/environments/api/api.$Environment.env" --file "C:/SFC/Bff/sfc-bff/compose.$Mode.yaml" --project-directory "C:\SFC\Bff\sfc-bff" up "--detach"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker Compose started successfully." -ForegroundColor Green
} else {
    Write-Host "Docker Compose failed with exit code $LASTEXITCODE." -ForegroundColor Red
    Down
}

# Post script (serve angular application)
Write-Host "Running post-up script..." -ForegroundColor Yellow
if (Test-Path $PostScript) {
    $linkParams = @{}

    if ($Link) {
        $linkParams.Link = $true
    }

    & $PostScript @linkParams
    Write-Host "Post-up script is finished." -ForegroundColor Green
} else {
    Write-Host "Post-script not found, skipping." -ForegroundColor Yellow
}

# Healthcheck sfc-bff application
$retry = 1
$maxRetries = 30
$containerName = "sfc-bff"
$intervalSeconds = 20
$timeoutSeconds = 120

Write-Host "Waiting ($timeoutSeconds seconds) for $containerName to become healthy..." -ForegroundColor Yellow
Start-Sleep -Seconds $timeoutSeconds

while ($retry -lt $maxRetries) {
    $inspect = docker inspect $containerName | ConvertFrom-Json
    if (-not $inspect) {
        Write-Host "Container '$containerName' not found." -ForegroundColor Red
        exit 1
    }

    $health = $inspect[0].State.Health.Status
    if (-not $health) {
        Write-Host "Container '$containerName' has no healthcheck defined." -ForegroundColor Yellow
        exit 0
    }

    Write-Host "Retry $retry/$maxRetries. Current status: $health" -ForegroundColor Yellow

    if ($health -eq "healthy") {
        Write-Host "Container '$containerName' is healthy!" -ForegroundColor Green
        Write-Host "Done!" -ForegroundColor Green
        exit 0
    }

    $retry++

    if($retry -lt $maxRetries){
        Write-Host "Waiting $intervalSeconds seconds..." -ForegroundColor Yellow
        Start-Sleep -Seconds $intervalSeconds
    }  
}

Write-Host "BFF application not Healthy!" -ForegroundColor Red
Down