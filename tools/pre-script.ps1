# Input parameters
param(
    [switch]$Build
)

function Build {
    param (
        [string]$ProjectName,
        [string]$ProjectPath
    )

    Write-Host "Building: $ProjectName" -ForegroundColor Yellow
    dotnet restore $ProjectPath  
    dotnet build $ProjectPath --configuration Debug
}


$IISService = Get-Service -Name W3SVC

if ($IISService.Status -eq 'Running') {
    Write-Output "IIS is running. Stopping service..."
    Stop-Service -Name W3SVC -Force
} else {
    Write-Output "IIS is not running."
}

if ($Build) {
    $servicesPath = "C:/SFC/Services"

    # Check if Services folder exists
    if (Test-Path $servicesPath) {
        # Get all first-level subfolders under Services
        $subfolders = Get-ChildItem -Path $servicesPath -Directory

        foreach ($folder in $subfolders) {
            # Look for .sln files only in this subfolder (no deeper recursion)
            $solutions = Get-ChildItem -Path $folder.FullName -Filter *.sln

            foreach ($solution in $solutions) {
                $folderPath = Split-Path $solution.FullName -Parent
                $solutionPathWithoutExt = [System.IO.Path]::ChangeExtension($solution.Name, $null)
                $buildProjectName = "$solutionPathWithoutExt" + "API"
                $buildProjectPath = "$folderPath/src/API/$buildProjectName/$buildProjectName.csproj"

                Build -ProjectName $buildProjectName -ProjectPath $buildProjectPath
                
                # Check if build succeeded
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "Build succeeded for $buildProjectName" -ForegroundColor Green
                } else {
                    Write-Host "Build failed for $buildProjectName" -ForegroundColor Red
                    exit 1  # Stop script on failure
                }
            }
        }
    } else {
        Write-Host "Services folder not found at: $servicesPath" -ForegroundColor Yellow
    }

    Build -ProjectName "BFF" -ProjectPath "C:/SFC/Bff/sfc-bff/src/Backend/SFC.Backend/SFC.Backend.csproj"
    Write-Host "Build succeeded for BFF" -ForegroundColor Green
}

exit 0