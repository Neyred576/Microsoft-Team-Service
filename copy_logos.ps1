$ErrorActionPreference = "Stop"

$destination = "c:\Users\prosp\Desktop\WEBSITES\Microsoft Team Service\MTS\public\logos"

if (!(Test-Path $destination)) {
    New-Item -ItemType Directory -Force -Path $destination
    Write-Host "Created directory: $destination"
}

Copy-Item "c:\Users\prosp\Desktop\WEBSITES\Microsoft Team Service\Company Logos\GLOBAL WAYS COMMERCIAL BROKERS LLC\WhatsApp Image 2026-06-24 at 6.28.52 PM.jpeg" -Destination "$destination\global_ways.jpeg" -Force
Write-Host "Copied GLOBAL WAYS logo"

Copy-Item "c:\Users\prosp\Desktop\WEBSITES\Microsoft Team Service\Company Logos\GLOBAL FINANCE\WhatsApp Image 2026-06-24 at 6.32.44 PM.jpeg" -Destination "$destination\global_finance.jpeg" -Force
Write-Host "Copied GLOBAL FINANCE logo"

Copy-Item "c:\Users\prosp\Desktop\WEBSITES\Microsoft Team Service\Company Logos\EGA EMIRATES GLOBAL ALUMINIUM\WhatsApp Image 2026-06-24 at 6.37.48 PM.jpeg" -Destination "$destination\ega.jpeg" -Force
Write-Host "Copied EGA logo"

Copy-Item "c:\Users\prosp\Desktop\WEBSITES\Microsoft Team Service\Company Logos\GLOBAL GROUP OF COMPANIES\WhatsApp Image 2026-06-24 at 6.43.36 PM.jpeg" -Destination "$destination\global_group.jpeg" -Force
Write-Host "Copied GLOBAL GROUP logo"

Write-Host "Done!"
