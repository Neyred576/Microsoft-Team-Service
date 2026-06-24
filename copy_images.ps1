$sourceDir = "C:\Users\prosp\.gemini\antigravity-ide\brain\87a16d1f-7dce-4b63-8194-1ad2617c159e"
$targetDir = "C:\Users\prosp\Desktop\WEBSITES\Microsoft Team Service\MTS\public"

Write-Host "Copying images to the public folder..."

Copy-Item "$sourceDir\hero_bg_1782291104883.png" -Destination "$targetDir\hero_bg.png" -Force
Copy-Item "$sourceDir\modern_work_1782291115710.png" -Destination "$targetDir\modern_work.png" -Force
Copy-Item "$sourceDir\contact_support_1782291126946.png" -Destination "$targetDir\contact_support.png" -Force

Write-Host "Done! Images are now in the public folder."
