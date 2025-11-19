# Input parameters
param(
    [string]$Environment = "Development",
    [string]$ComposeFileName = "compose.Development"
)

$PreScript = "C:/SFC/Bff/sfc-bff/tools/pre-script.ps1"
$PostScript = "C:/SFC/Bff/sfc-bff/tools/post-script.ps1"

Write-Host "Running pre-up script..."
if (Test-Path $PreScript) {
    & $PreScript
    Write-Host "Pre-up script is finished."
} else {
    Write-Host "Pre-script not found, skipping."
}

Write-Host "Starting Docker Compose..."
& "docker-compose" --env-file "C:/SFC/Bff/sfc-bff/environments/api/api.$Environment.env" --file "C:/SFC/Bff/sfc-bff/$ComposeFileName.yaml" --project-directory "C:\SFC\Bff\sfc-bff" up "--detach"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker Compose started successfully."
} else {
    Write-Host "Docker Compose failed with exit code $LASTEXITCODE."
    exit 1
}

Write-Host "Running post-up script..."
if (Test-Path $PostScript) {
    & $PostScript
    Write-Host "Post-up script is finished."
} else {
    Write-Host "Post-script not found, skipping."
}

Write-Host "Done!"
exit 0