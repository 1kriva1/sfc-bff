function StopProcess(){
    param(
        [string]$CommandLine
    )

    $process = Get-CimInstance Win32_Process | Where-Object { $_.ExecutablePath -like "*node*" -and $_.CommandLine -like "*$CommandLine*" }

    if ($process) {
        Write-Host "Stopping process for ($CommandLine) with PID $($process.ProcessId)..." -ForegroundColor Yellow
        Stop-Process -Id $process.ProcessId -Force
        Write-Host "Process ($CommandLine) stopped." -ForegroundColor Green
    } else {
        Write-Host "No process for ($CommandLine) found." -ForegroundColor Yellow
    }
}

Write-Host "Starting down Docker Compose..." -ForegroundColor Yellow
& "docker-compose" --env-file "C:/SFC/Bff/sfc-bff/environments/api/api.Development.env" --project-directory "C:\SFC\Bff\sfc-bff" down

if ($LASTEXITCODE -eq 0) {
    Write-Host "Docker Compose down successfully." -ForegroundColor Green
} else {
    Write-Host "Docker Compose was failed with exit code $LASTEXITCODE." -ForegroundColor Red
    exit 1
}

# Stop angular application
StopProcess -CommandLine "--host=sfc-bff --port 4200"

# Stop angular ngx-common projects
StopProcess -CommandLine "build ngx-sfc-common --watch"

# Stop angular ngx-components projects
StopProcess -CommandLine "build ngx-sfc-components --watch"

# Stop angular ngx-inputs projects
StopProcess -CommandLine "build ngx-sfc-inputs --watch"

Write-Host "Done!" -ForegroundColor Green
exit 0