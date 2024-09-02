###################################### Redis ###################################################

Write-Host "Redis server is starting"

invoke-expression 'cmd /c start powershell -Command {
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\BFF"; 
    bash ./redis-server.sh;    
}'

Start-Sleep -Seconds 5

Write-Host "Redis server is running`n"

##################################### Data serivce ##########################################

Write-Host "Data service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Data service"
    write-host "Start Data service!";
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Data\src\API\SFC.Data.Api"; 
    dotnet run --urls=https://localhost:7466/ authentication=true
}'

Start-Sleep -Seconds 60

Write-Host "Data service is running`n"

###################################### Identity serivce ########################################

Write-Host "Identity service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Identity service"
    write-host "Start Identity service!";
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Identity\src\API\SFC.Identity.Api"; 
    dotnet run --urls=https://localhost:7266/
}'

Start-Sleep -Seconds 5

Write-Host "Identity service is running`n"

##################################### Player serivce ##########################################

Write-Host "Player service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Player service"
    write-host "Start Player service!";
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Player\src\API\SFC.Player.Api"; 
    dotnet run --urls=https://localhost:7366/ authentication=true
}'

Write-Host "Player service is running`n"

###############################################################################################