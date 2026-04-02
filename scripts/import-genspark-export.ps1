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

foreach ($file in $topLevelFiles) {
  $destination = Join-Path $pagesRoot $file.Name
  $content = Get-Content -Raw -LiteralPath $file.FullName
  $content = $content.Replace('href="css/', 'href="../css/')
  $content = $content.Replace('src="css/', 'src="../css/')
  $content = $content.Replace('href="js/', 'href="../js/')
  $content = $content.Replace('src="js/', 'src="../js/')
  $content = $content.Replace('href="assets/', 'href="../assets/')
  $content = $content.Replace('src="assets/', 'src="../assets/')
  $content = $content.Replace('href="images/', 'href="../images/')
  $content = $content.Replace('src="images/', 'src="../images/')
  Set-Content -LiteralPath $destination -Value $content
  Write-Host "Synced $($file.Name)"
}

$assetFolders = @('css', 'js', 'assets', 'images')
foreach ($folder in $assetFolders) {
  $sourceFolder = Join-Path $sourceRoot $folder
  if (-not (Test-Path -LiteralPath $sourceFolder -PathType Container)) {
    continue
  }

  $destinationFolder = Join-Path $repoRootFull $folder
  if (-not (Test-Path -LiteralPath $destinationFolder -PathType Container)) {
    New-Item -ItemType Directory -Path $destinationFolder | Out-Null
  }

  Get-ChildItem -LiteralPath $sourceFolder -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $destinationFolder -Recurse -Force
  }
  Write-Host "Synced $folder/"
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
