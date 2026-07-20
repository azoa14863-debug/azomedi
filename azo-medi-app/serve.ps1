$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -eq 'Dhcp' } | Select-Object -First 1).IPAddress

$urls = @("http://localhost:8080/")
if ($ip) { $urls += "http://${ip}:8080/" }

foreach ($url in $urls) {
    try {
        $reserved = netsh http show urlacl $url 2>$null
        if ($reserved -notmatch $url) {
            netsh http add urlacl url=$url user=Everyone 2>$null | Out-Null
        }
    } catch {}
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:8080/")

try {
    $listener.Start()
} catch {
    Write-Host ""
    Write-Host "Puerto 8080 en uso. Intentando otro puerto..."
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://+:8081/")
    $listener.Start()
    $port = 8081
    if ($ip) { $port = 8081 }
}

$port = 8080
if ($listener.Prefixes -match "8081") { $port = 8081 }

Write-Host ""
Write-Host "========================================="
Write-Host "  Azo Medi - Servidor Local"
Write-Host "========================================="
Write-Host ""
if ($ip) {
    Write-Host "  Abre en tu telefono (mismo WiFi):"
    Write-Host ""
    Write-Host "  App:   http://${ip}:${port}/index.html" -ForegroundColor Green
    Write-Host "  Admin: http://${ip}:${port}/admin.html" -ForegroundColor Green
} else {
    Write-Host "  App:   http://localhost:${port}/index.html" -ForegroundColor Green
    Write-Host "  Admin: http://localhost:${port}/admin.html" -ForegroundColor Green
}
Write-Host ""
Write-Host "  Presiona Ctrl+C para detener"
Write-Host "========================================="

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $path = $context.Request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }

        $file = Join-Path $root $path.TrimStart("/").Replace("/", "\")

        if (Test-Path $file -LiteralPath) {
            $ext = [System.IO.Path]::GetExtension($file)
            $mime = $mimeTypes[$ext]
            if (-not $mime) { $mime = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($file)
            $context.Response.ContentType = $mime
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $context.Response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $context.Response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $context.Response.Close()
    } catch {}
}
