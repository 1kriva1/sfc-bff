################################################################### Services ###############################################################

$servicesNames = 'SFC.Data.Api', 'SFC.Identity.Api', 'SFC.Player.Api'

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

    wt.exe --window 0 new-tab --profile "Windows PowerShell" PowerShell -file C:\Users\andriik\Documents\SFC_NEW\services\BFF\start-services.ps1
}else {
    write-host("All required services: $($servicesNames) - already running.")
}

############################################################################################################################################

################################################################### Application ############################################################

$ScriptPath = Split-Path $MyInvocation.InvocationName
& "$ScriptPath\start-application.ps1"

############################################################################################################################################