Write-Host "Running npm install..."
Start-Process "npm.cmd" -ArgumentList "install" -WorkingDirectory "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend" -NoNewWindow -Wait
Write-Host "Npm install is done!"

Write-Host "Start SFC application..."
Start-Process "npm.cmd" -ArgumentList "run start:sfc.backend" -WorkingDirectory "C:\SFC\Bff\sfc-bff\src\Frontend\SFC.Frontend" -WindowStyle Normal