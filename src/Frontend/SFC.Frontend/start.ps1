###################################### Redis ###################################################

Write-Host "Redis server is starting"

invoke-expression 'cmd /c start powershell -Command {
    bash ./redis-server.sh;    
}'

Write-Host "Redis server is running`n"

##################################### Data serivce ##########################################

Write-Host "Data service is starting"

invoke-expression 'cmd /c start powershell -Command {
    write-host "Start Data service!";
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Data\src\API\SFC.Data.Api"; 
    dotnet run  --urls=https://localhost:7466/
}'

Start-Sleep -Seconds 15

Write-Host "Data service is running`n"

###################################### Identity serivce ########################################

Write-Host "Identity service is starting"

invoke-expression 'cmd /c start powershell -Command {
    write-host "Start Identity service!";
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Identity\src\API\SFC.Identity.Api"; 
    dotnet run  --urls=https://localhost:7266/
}'

Start-Sleep -Seconds 15

Write-Host "Identity service is running`n"

##################################### Player serivce ##########################################

Write-Host "Player service is starting"

invoke-expression 'cmd /c start powershell -Command {
    write-host "Start Player service!";
    set-location "C:\Users\andriik\Documents\SFC_NEW\services\Player\src\API\SFC.Player.Api"; 
    dotnet run  --urls=https://localhost:7366/
}'

Start-Sleep -Seconds 15

Write-Host "Player service is running`n"

#################################################################################################

Write-Host "Application is starting"

npm run application

#################################################################################################