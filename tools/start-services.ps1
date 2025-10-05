###################################### Redis ###################################################

Write-Host "Redis server is starting"

invoke-expression 'cmd /c start powershell -NoExit -Command {
    set-location "C:\SFC\Bff\sfc-bff"; 
    bash ./tools/redis-server.sh;    
}'

Start-Sleep -Seconds 5

Write-Host "Redis server is running`n"

##################################### Data serivce ##########################################

Write-Host "Data service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Data service"
    write-host "Start Data service!";
    set-location "C:\SFC\Services\sfc-data-service\src\API\SFC.Data.Api"; 
    dotnet run --urls=https://localhost:7466/ UseAuthentication=true
}'

Start-Sleep -Seconds 50

Write-Host "Data service is running`n"

###################################### Identity serivce ########################################

Write-Host "Identity service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Identity service"
    write-host "Start Identity service!";
    set-location "C:\SFC\Services\sfc-identity-service\src\API\SFC.Identity.Api"; 
    dotnet run --urls=https://localhost:7266/ UseAuthentication=true
}'

Start-Sleep -Seconds 20

Write-Host "Identity service is running`n"

##################################### Player serivce ##########################################

Write-Host "Player service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Player service"
    write-host "Start Player service!";
    set-location "C:\SFC\Services\sfc-player-service\src\API\SFC.Player.Api"; 
    dotnet run --urls=https://localhost:7366/ UseAuthentication=true
}'

Start-Sleep -Seconds 20

Write-Host "Player service is running`n"

##################################### Team serivce ##########################################

Write-Host "Team service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Team service"
    write-host "Start Team service!";
    set-location "C:\SFC\Services\sfc-team-service\src\API\SFC.Team.Api"; 
    dotnet run --urls=https://localhost:7566/ UseAuthentication=true
}'

Start-Sleep -Seconds 20

Write-Host "Team service is running`n"

##################################### Invite serivce ##########################################

Write-Host "Invite service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Invite service"
    write-host "Start Invite service!";
    set-location "C:\SFC\Services\sfc-invite-service\src\API\SFC.Invite.Api"; 
    dotnet run --urls=https://localhost:7666/ UseAuthentication=true
}'

Start-Sleep -Seconds 20

Write-Host "Team service is running`n"

##################################### Request serivce ##########################################

Write-Host "Request service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Request service"
    write-host "Start Request service!";
    set-location "C:\SFC\Services\sfc-request-service\src\API\SFC.Request.Api"; 
    dotnet run --urls=https://localhost:7766/ UseAuthentication=true
}'

Start-Sleep -Seconds 20

Write-Host "Team service is running`n"

##################################### Scheme serivce ##########################################

Write-Host "Scheme service is starting"

invoke-expression 'cmd /c start powershell -Command {
    $host.ui.rawui.WindowTitle = "SFC - Scheme service"
    write-host "Start Scheme service!";
    set-location "C:\SFC\Services\sfc-scheme-service\src\API\SFC.Scheme.Api"; 
    dotnet run --urls=https://localhost:7866/ UseAuthentication=true
}'

Start-Sleep -Seconds 20

Write-Host "Scheme service is running`n"

###############################################################################################
