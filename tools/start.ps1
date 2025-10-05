################################################################### Services ###############################################################

$servicesNames = 'SFC.Data.Api', 'SFC.Identity.Api', 'SFC.Player.Api','SFC.Team.Api','SFC.Invite.Api','SFC.Request.Api','SFC.Scheme.Api'

$servicesProcesses = Get-Process -Name $servicesNames -ErrorAction SilentlyContinue

if($servicesProcesses.Count -ne $servicesNames.Count){
    write-host("Some of required services NOT running.")

    write-host("Stop all services.")

    ForEach ($Process in $servicesProcesses) {
        $Process.Kill()
    }

    Start-Sleep -Seconds 5

    Get-Process -Name node | where-object {$_.MainWindowTitle -eq "SFC - Identity service"} | Kill

    write-host("Start all services.")

    wt.exe --window 0 new-tab --profile "Windows PowerShell" PowerShell -file C:\SFC\Bff\sfc-bff\tools\start-services.ps1
}else {
    write-host("All required services: $($servicesNames) - already running.")
}

############################################################################################################################################

################################################################### Application ############################################################

$ScriptPath = Split-Path $MyInvocation.InvocationName
& "$ScriptPath\start-application.ps1"

############################################################################################################################################