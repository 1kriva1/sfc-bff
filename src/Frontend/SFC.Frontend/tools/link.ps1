# link.ps1
Write-Host "Starting link process for ngx-sfc projects..." -ForegroundColor Yellow

# Save current location
Push-Location

try{
    $globalNodeModules = Join-Path $env:APPDATA "npm\node_modules"
    Write-Host "Global npm node_modules path: $globalNodeModules" -ForegroundColor Yellow

    $projects = @("ngx-sfc-common", "ngx-sfc-components", "ngx-sfc-inputs")

    function Check(){    
        foreach ($project in $projects) {
            $fullPath = Join-Path $globalNodeModules $project
            if (-not (Test-Path $fullPath)) {
                Write-Host "Project NOT found: $project" -ForegroundColor Magenta
                return $false
            }
        }

        Write-Host "All projects exist." -ForegroundColor Green
        return $true
    }

    # $exist = Check

    # if (!$exist) {
    #     sfc-ngx-link
    # }

    sfc-ngx-link

    Set-Location "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend"

    Write-Host "Running npm link..." -ForegroundColor Yellow
    npm link $projects[0] $projects[1] $projects[2]

    Write-Host "Process completed successfully!" -ForegroundColor Green
}
finally {
    # Return to original location
    Pop-Location
}

