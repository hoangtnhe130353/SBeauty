param(
  [Parameter(Mandatory = $true)]
  [string]$SourcePath,

  [switch]$RemoveSource
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$sourceRoot = [System.IO.Path]::GetFullPath((Join-Path $PWD $SourcePath))
$repoRootFull = [System.IO.Path]::GetFullPath($repoRoot)
$pagesRoot = Join-Path $repoRootFull 'pages'
$assetsRoot = Join-Path $repoRootFull 'assets'

if (-not (Test-Path -LiteralPath $sourceRoot -PathType Container)) {
  throw "Source folder not found: $SourcePath"
}

$requiredRootFiles = @('index.html')
foreach ($file in $requiredRootFiles) {
  if (-not (Test-Path -LiteralPath (Join-Path $sourceRoot $file) -PathType Leaf)) {
    throw "Missing required export file: $file"
  }
}

$topLevelFiles = Get-ChildItem -LiteralPath $sourceRoot -File |
  Where-Object { $_.Extension -eq '.html' }

if (-not (Test-Path -LiteralPath $pagesRoot -PathType Container)) {
  New-Item -ItemType Directory -Path $pagesRoot | Out-Null
}

if (-not (Test-Path -LiteralPath $assetsRoot -PathType Container)) {
  New-Item -ItemType Directory -Path $assetsRoot | Out-Null
}

foreach ($file in $topLevelFiles) {
  $destination = Join-Path $pagesRoot $file.Name
  $content = Get-Content -Raw -LiteralPath $file.FullName
  $content = $content.Replace('href="css/', 'href="../assets/css/')
  $content = $content.Replace('src="css/', 'src="../assets/css/')
  $content = $content.Replace('href="js/', 'href="../assets/js/')
  $content = $content.Replace('src="js/', 'src="../assets/js/')
  $content = $content.Replace('href="assets/', 'href="../assets/')
  $content = $content.Replace('src="assets/', 'src="../assets/')
  $content = $content.Replace('href="images/', 'href="../assets/images/')
  $content = $content.Replace('src="images/', 'src="../assets/images/')
  Set-Content -Encoding utf8 -LiteralPath $destination -Value $content
  Write-Host "Synced $($file.Name)"
}

$assetFolders = @('css', 'js', 'data', 'assets', 'images')
foreach ($folder in $assetFolders) {
  $sourceFolder = Join-Path $sourceRoot $folder
  if (-not (Test-Path -LiteralPath $sourceFolder -PathType Container)) {
    continue
  }

  if ($folder -eq 'assets') {
    Get-ChildItem -LiteralPath $sourceFolder -Force | ForEach-Object {
      Copy-Item -LiteralPath $_.FullName -Destination $assetsRoot -Recurse -Force
    }
    Write-Host "Synced assets/"
    continue
  }

  $destinationFolder = Join-Path $assetsRoot $folder
  if (-not (Test-Path -LiteralPath $destinationFolder -PathType Container)) {
    New-Item -ItemType Directory -Path $destinationFolder | Out-Null
  }

  Get-ChildItem -LiteralPath $sourceFolder -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $destinationFolder -Recurse -Force
  }
  Write-Host "Synced assets/$folder/"
}

if ($RemoveSource) {
  if (-not $sourceRoot.StartsWith($repoRootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove source outside repo: $sourceRoot"
  }

  if ($sourceRoot -eq $repoRootFull) {
    throw "Refusing to remove repo root."
  }

  Remove-Item -LiteralPath $sourceRoot -Recurse -Force
  Write-Host "Removed source folder: $sourceRoot"
}
