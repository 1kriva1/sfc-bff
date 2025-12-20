param(
    [switch]$Link
)

Write-Host "Running start-application script..." -ForegroundColor Yellow

$params = @{
    NewWindow = $true
}

if ($Link) {
    $params.Link = $true
}

sfc-app @params

Write-Host "Start-application script is finished." -ForegroundColor Green