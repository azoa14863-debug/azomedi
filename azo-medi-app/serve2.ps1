$root = "C:\Users\Lenovo\Documents\Default Project\azo-medi-app"
$ip = "192.168.0.189"
$port = 8080

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://${ip}:${port}/")

try {
    $listener.Start()
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    $port = 8081
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://${ip}:${port}/")
    $listener.Start()
}

Write-Host ""
Write-Host "========================================="
Write-Host "  Azo Medi - Servidor"
Write-Host "========================================="
Write-Host ""
Write-Host "  App:   http://${ip}:${port}/index.html" -ForegroundColor Green
Write-Host "  Admin: http://${ip}:${port}/admin.html" -ForegroundColor Green
Write-Host ""
Write-Host "  Ctrl+C para detener"
Write-Host "========================================="

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
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
        }
        $context.Response.Close()
    } catch {}
}
