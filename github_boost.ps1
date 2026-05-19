for ($i = 1; $i -le 20; $i++) {
    $date = Get-Date
    "Commit $i on $date" | Out-File -Append dummy_activity.txt
    git add dummy_activity.txt
    git commit -m "Update activity log $i"
}
git push
