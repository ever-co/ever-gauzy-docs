---
sidebar_position: 1
---

# Self-Hosted GitHub Runners (Windows)

Step-by-step guide for provisioning a Windows 10/11 (x64) machine as a self-hosted GitHub Actions runner for the Ever Gauzy project.

:::note
**Runner version:** 2.331.0 (update the version and checksum below as needed)
**Estimated time:** ~1–2 hours (Visual Studio Build Tools takes the longest)
:::

## Prerequisites

- A fresh or clean Windows 10/11 machine with administrator access
- Internet connectivity
- A GitHub organization runner registration token — see [Adding self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners)

:::tip
All commands in this guide must be run in an **elevated (Administrator) PowerShell** terminal.
:::

---

## Step 1 — Install the GitHub Actions Runner

```powershell
mkdir C:\actions-runner; cd C:\actions-runner

# Download the runner
Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.331.0/actions-runner-win-x64-2.331.0.zip -OutFile actions-runner-win-x64-2.331.0.zip

# Verify checksum
if ((Get-FileHash -Path actions-runner-win-x64-2.331.0.zip -Algorithm SHA256).Hash.ToUpper() -ne '473e74b86cd826e073f1c1f2c004d3fb9e6c9665d0d51710a23e5084a601c78a'.ToUpper()) {
    throw 'Computed checksum did not match'
}

# Extract
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory("$PWD\actions-runner-win-x64-2.331.0.zip", "$PWD")
```

## Step 2 — Configure the Runner

```powershell
# Replace YOUR_TOKEN with the registration token from GitHub
./config.cmd --url https://github.com/ever-co --token YOUR_TOKEN
```

Get a token from **GitHub → Organization Settings → Actions → Runners → New self-hosted runner**. Tokens are short-lived, so generate one right before running this command.

## Step 3 — Enable Long Path Support

Windows has a 260-character path limit by default, which breaks many Node.js projects.

```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Control\FileSystem" /v LongPathsEnabled /t REG_DWORD /d 1 /f
```

:::warning
A reboot is required for this change to take full effect.
:::

## Step 4 — Install Chocolatey

[Chocolatey](https://chocolatey.org/) is used as the primary package manager for the remaining tools.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Refresh PATH so choco is available
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Step 5 — Install Build Tools and Dependencies

### 5a. Visual Studio 2022 Build Tools

Required for compiling native Node.js modules (node-gyp, etc.). This step takes ~20–60 minutes.

```powershell
choco install -y visualstudio2022buildtools --execution-timeout=21600 --package-parameters "--add Microsoft.VisualStudio.Workload.VCTools --includeRecommended --includeOptional --passive --norestart"
```

### 5b. Git, Python, Node.js, Yarn, and NSIS

```powershell
choco install -y git --params "/GitAndUnixToolsOnPATH"
choco install -y python3 --params "/InstallDir:C:\Python"
choco install -y nodejs-lts
choco install -y yarn
choco install -y nsis
```

### 5c. Refresh PATH and Verify

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "=== Verification ===" -ForegroundColor Cyan
@("git","bash","node","npm","yarn","python","pip","makensis") | ForEach-Object {
    $cmd = Get-Command $_ -ErrorAction SilentlyContinue
    if ($cmd) { Write-Host "  OK $_ : $($cmd.Source)" -ForegroundColor Green }
    else      { Write-Host "  MISSING $_ : NOT FOUND"  -ForegroundColor Red }
}
```

## Step 6 — Create `python3` Alias

Some build scripts expect `python3` to exist on Windows. Create a copy next to `python.exe`:

```powershell
$pythonPath = (Get-Command python.exe -ErrorAction SilentlyContinue).Source
if ($pythonPath) {
    $dir = Split-Path $pythonPath -Parent
    Copy-Item $pythonPath (Join-Path $dir "python3.exe") -Force
    Write-Host "Created python3.exe at $dir" -ForegroundColor Green
} else {
    Write-Host "Python not found - check Step 5b" -ForegroundColor Red
}
```

Verify both work:

```powershell
python --version
python3 --version
```

## Step 7 — Configure Git for Long Paths

```powershell
git config --system core.longpaths true
```

## Step 8 — Enable Developer Mode

Required for symlink support without elevation (used by some Node.js tooling):

```powershell
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /f /v "AllowDevelopmentWithoutDevLicense" /d "1"
```

## Step 9 — Set Execution Policy

```powershell
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine -Force
```

## Step 10 — Performance Tuning

### 10a. Add Antivirus Exclusions

This significantly speeds up builds by skipping real-time scanning of the runner workspace and common build processes:

```powershell
Add-MpPreference -ExclusionPath "C:\actions-runner"
Add-MpPreference -ExclusionProcess "node.exe"
Add-MpPreference -ExclusionProcess "pwsh.exe"
```

### 10b. Disable Windows Search Indexing

The `WSearch` service wastes I/O on a dedicated build machine:

```powershell
Stop-Service -Name "WSearch" -Force
Set-Service  -Name "WSearch" -StartupType Disabled
```

## Step 11 — Restart the Runner Service

After all installations, restart the runner so it picks up the updated PATH and environment:

```powershell
Restart-Service actions.runner.ever-co.* -Force
Write-Host "Runner service restarted." -ForegroundColor Green
```

:::note
Replace `ever-co` with your organization name if different.
:::

---

## Tools Installed

| Tool                           | Purpose                                |
| ------------------------------ | -------------------------------------- |
| GitHub Actions Runner          | Executes CI/CD workflows               |
| Chocolatey                     | Windows package manager                |
| Visual Studio 2022 Build Tools | Native module compilation (node-gyp)   |
| Git (+ Unix tools)             | Source control & bash shell            |
| Node.js LTS                    | JavaScript runtime                     |
| Yarn                           | Package manager for Node.js            |
| Python 3                       | Required by node-gyp and build scripts |
| NSIS                           | Installer builder for Electron apps    |

## Final Verification

Run this block to confirm everything is working:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "  GitHub Actions Runner - Verification  "  -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

@(
    @{ Name="git";      Cmd="git --version" },
    @{ Name="bash";     Cmd="bash --version" },
    @{ Name="node";     Cmd="node --version" },
    @{ Name="npm";      Cmd="npm --version" },
    @{ Name="yarn";     Cmd="yarn --version" },
    @{ Name="python";   Cmd="python --version" },
    @{ Name="python3";  Cmd="python3 --version" },
    @{ Name="pip";      Cmd="pip --version" },
    @{ Name="makensis"; Cmd="makensis /VERSION" }
) | ForEach-Object {
    $result = try { Invoke-Expression $_.Cmd 2>&1 } catch { "NOT FOUND" }
    $color = if ($result -match "NOT FOUND|not recognized") { "Red" } else { "Green" }
    $symbol = if ($color -eq "Green") { "OK" } else { "MISSING" }
    Write-Host "  $symbol $($_.Name): $result" -ForegroundColor $color
}

Write-Host ""
Write-Host "Runner service status:" -ForegroundColor Cyan
Get-Service actions.runner.* | Format-Table Name, Status -AutoSize
```

## Troubleshooting

| Problem                         | Fix                                                                  |
| ------------------------------- | -------------------------------------------------------------------- |
| `bash` not found                | Reinstall Git with the `/GitAndUnixToolsOnPATH` flag                 |
| `node-gyp` build fails          | Verify VS Build Tools installed with VCTools workload                |
| `python3` not recognized        | Re-run Step 6 to create the alias                                    |
| PATH changes not taking effect  | Restart the runner service (`Restart-Service actions.runner.*`)      |
| Runner not picking up new tools | The runner caches its env at startup — always restart after installs |
| Long path errors                | Verify Step 3 and Step 7 are both applied, then reboot               |

---

## Optional — Fully Disabling Antivirus

:::danger Security Warning
The steps below **completely turn off** real-time protection and anti-spyware scanning. This improves build performance but leaves the machine **fully unprotected** against malware and ransomware.

**Recommended approach:** use the targeted exclusions from [Step 10a](#10a-add-antivirus-exclusions) instead — they provide most of the performance benefit while keeping the machine protected.

**Only consider this if:**

- The machine is a dedicated build runner with no other use
- It is on a private/isolated network, not used for browsing or email
- You accept the risk of running without any antivirus protection
  :::

### Disable Real-Time Monitoring

```powershell
Set-MpPreference -DisableRealtimeMonitoring $true
```

:::note
If Tamper Protection is enabled (default on Windows 11), this command may be silently ignored. Turn off Tamper Protection manually via **Windows Security → Virus & threat protection → Manage settings → Tamper Protection → Off** before running the command.
:::

### Disable via Group Policy Registry Key

```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiSpyware" -Value 1 -PropertyType DWORD -Force
```

### Restart the Runner Service

```powershell
Restart-Service actions.runner.ever-co.* -Force
```

### How to Re-Enable

To reverse the above and restore protection:

```powershell
Set-MpPreference -DisableRealtimeMonitoring $false
Remove-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiSpyware" -Force
```

## Related Pages

- [CI/CD Overview](./ci-cd-overview)
- [GitHub Actions](./github-actions)
- [Desktop Apps](../../desktop/desktop-overview)
