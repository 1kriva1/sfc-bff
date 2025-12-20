# start.ps1

param(
    [switch]$NewWindow,
    [switch]$Link
)

function CheckLinkedProjects(){
    $globalNodeModules = Join-Path $env:APPDATA "npm\node_modules"
    $projects = @("ngx-sfc-common", "ngx-sfc-components", "ngx-sfc-inputs")
    foreach ($project in $projects) {
        $fullPath = Join-Path $globalNodeModules $project
        if (Test-Path $fullPath) {
            return $true
        }
    }

    return $false
}

Write-Host "Running npm install..." -ForegroundColor Yellow
Start-Process "npm.cmd" -ArgumentList "install" -WorkingDirectory "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend" -NoNewWindow -Wait
Write-Host "Npm install is done!"

if ($Link) {
    sfc-app-link
    sfc-ngx -NewWindow

    Write-Host "Waiting 30seconds for sfc-ngx-projects..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30
} else {
    $exist = CheckLinkedProjects

    if ($exist) {
        Write-Host "Unlink sfc ngx projects are required." -ForegroundColor Yellow
        sfc-app-unlink
    }    
}

if ($NewWindow) {
    Write-Host "Start SFC application at new window..." -ForegroundColor Magenta
    Start-Process "npm.cmd" -ArgumentList "run start:sfc.backend" -WorkingDirectory "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend" -WindowStyle Normal
} else {
    Write-Host "Start SFC application..." -ForegroundColor Magenta
    Start-Process "npm.cmd" -ArgumentList "run start:sfc.backend" -WorkingDirectory "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend" -NoNewWindow -Wait
}