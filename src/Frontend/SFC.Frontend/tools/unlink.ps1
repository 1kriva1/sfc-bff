# unlink.ps1
Write-Host "Starting unlink process for ngx-sfc projects..." -ForegroundColor Yellow

$projects = @("ngx-sfc-common", "ngx-sfc-components", "ngx-sfc-inputs")

# Write-Host "Running npm unlink..." -ForegroundColor Yellow
# npm unlink $projects[0] $projects[1] $projects[2] --prefix "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend"

Write-Host "Running npm unlink for projects..." -ForegroundColor Yellow
sfc-ngx-unlink
Write-Host "All projects were unlinked." -ForegroundColor Green

Write-Host "Process completed successfully!" -ForegroundColor Green