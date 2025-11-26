---
title: chezmoi
description: A comprehensive guide to chezmoi for managing dotfiles across multiple machines securely with templating, encryption, and password manager integration.
date: 2024-11-26T00:00:00
toc: true
summary: A cheatsheet for chezmoi dotfile management with modern templating best practices, machine-specific configuration, encryption, and password manager integration.
slug: chezmoi
permalink: /notes/chezmoi
comments: true
tags:
  - development
  - dotfiles
  - tooling
  - automation
---

## Overview

[Chezmoi](https://www.chezmoi.io/) is a powerful dotfile manager that helps you securely manage personal configuration files across multiple diverse machines.
Unlike simple symlink-based solutions, chezmoi uses Go templates for machine-specific configuration and supports encryption and password manager integration out of the box.

## Quick Start

### Installation

```shell
# macOS/Linux with Homebrew
brew install chezmoi

# One-liner install (macOS/Linux)
sh -c "$(curl -fsLS get.chezmoi.io)"

# Windows with Scoop
scoop install chezmoi

# Go install
go install github.com/twpayne/chezmoi/v2@latest
```

### Initialize and Apply

```shell
# Initialize chezmoi with your dotfiles repo
chezmoi init https://github.com/$GITHUB_USERNAME/dotfiles.git

# Preview changes before applying
chezmoi diff

# Apply changes
chezmoi apply

# One-liner for new machine setup
chezmoi init --apply --verbose https://github.com/$GITHUB_USERNAME/dotfiles.git
```

## Template Best Practices

### 1. Whitespace Control

Use `{{-` and `-}}` for proper whitespace control in templates.
This prevents unwanted blank lines in generated files.

```go-template
{{- if eq .chezmoi.os "linux" -}}
# Linux-specific configuration
export LINUX_VAR=true
{{- else if eq .chezmoi.os "darwin" -}}
# macOS-specific configuration
export MACOS_VAR=true
{{- end -}}
```

Without whitespace control:

```go-template
{{ if eq .chezmoi.os "linux" }}
# This will have extra blank lines
{{ end }}
```

### 2. Machine-Specific Configuration

Access built-in chezmoi variables for OS detection and machine-specific configuration.

```go-template
# Basic OS detection
{{ if eq .chezmoi.os "darwin" }}
# macOS-specific code
export PATH="/opt/homebrew/bin:$PATH"
{{ else if eq .chezmoi.os "linux" }}
# Linux-specific code
export PATH="$HOME/.local/bin:$PATH"
{{ else if eq .chezmoi.os "windows" }}
# Windows-specific code
{{ end }}
```

For Linux distribution detection:

```go-template
{{ if eq .chezmoi.os "linux" }}
{{   if eq .chezmoi.osRelease.id "debian" }}
# Debian-specific code
{{   else if eq .chezmoi.osRelease.id "fedora" }}
# Fedora-specific code
{{   else if eq .chezmoi.osRelease.id "arch" }}
# Arch-specific code
{{   end }}
{{ end }}
```

Simplify with a custom variable in `.chezmoi.toml.tmpl`:

```go-template
{{- $osid := .chezmoi.os -}}
{{- if hasKey .chezmoi.osRelease "id" -}}
{{-   $osid = printf "%s-%s" .chezmoi.os .chezmoi.osRelease.id -}}
{{- end -}}

[data]
    osid = {{ $osid | quote }}
```

Then use in templates:

```go-template
{{ if eq .osid "linux-debian" }}
# Debian-specific configuration
{{ end }}
```

### 3. WSL Detection

```go-template
{{ if eq .chezmoi.os "linux" }}
{{   if (.chezmoi.kernel.osrelease | lower | contains "microsoft") }}
# Running in WSL
export BROWSER="wslview"
{{   end }}
{{ end }}
```

### 4. Chassis Detection (Laptop vs Desktop)

```go-template
{{- $chassisType := "desktop" }}
{{- if eq .chezmoi.os "darwin" }}
{{-   if contains "MacBook" (output "system_profiler" "SPHardwareDataType") }}
{{-     $chassisType = "laptop" }}
{{-   end }}
{{- else if eq .chezmoi.os "linux" }}
{{-   $chassisType = (output "hostnamectl" "--json=short" | mustFromJson).Chassis }}
{{- end }}

[data]
    chassisType = {{ $chassisType | quote }}
```

## Reusable Templates with `.chezmoitemplates/`

Create reusable template partials in the `.chezmoitemplates/` directory.

### Create a Template

```bash
chezmoi cd
mkdir -p .chezmoitemplates
```

Create `.chezmoitemplates/alacritty`:

```go-template
some: config
fontsize: {{ .fontsize }}
font: {{ .font }}
more: config
```

### Use the Template

In `.chezmoi.toml`:

```toml
[data.alacritty.big]
    fontsize = 18
    font = "DejaVu Serif"
[data.alacritty.small]
    fontsize = 12
    font = "DejaVu Sans Mono"
```

In your config template file:

```go-template
{{- template "alacritty" .alacritty.small -}}
```

Or with inline data:

```go-template
{{- template "alacritty" dict "fontsize" 12 "font" "DejaVu Sans Mono" -}}
```

## Password Manager Integration

### 1Password

```go-template
# Read a secret directly
export CF_API_TOKEN='{{ onepasswordRead "op://Personal/cloudflare-api-token/password" }}'
```

SSH config example:

```go-template
Host work-server
    HostName {{ (onepasswordRead "op://Private/Work Server/hostname").value }}
    User {{ (onepasswordRead "op://Private/Work Server/username").value }}
```

Configuration in `chezmoi.toml`:

```toml
[onepassword]
    prompt = true  # Prompt for sign-in if needed
```

### Bitwarden

```go-template
username = {{ (bitwarden "item" "example.com").login.username }}
password = {{ (bitwarden "item" "example.com").login.password }}
```

For Bitwarden Secrets Manager:

```toml
# chezmoi.toml
[data]
    accessToken = "0.48c78342-1635-48a6-accd-afbe01336365.C0tMmQqHnAp1h0gL8bngprlPOYutt0:B3h5D+YgLvFiQhWkIq6Bow=="
```

```go-template
{{ (bitwardenSecrets "be8e0ad8-d545-4017-a55a-b02f014d4158" .accessToken).value }}
```

## External Files with `.chezmoiexternal.toml`

Manage external dependencies like Oh-My-Zsh plugins without vendoring them in your repo.

```toml
# Oh-My-Zsh
[".oh-my-zsh"]
    type = "archive"
    url = "https://github.com/ohmyzsh/ohmyzsh/archive/master.tar.gz"
    exact = true
    stripComponents = 1
    refreshPeriod = "168h"

# Zsh plugins
[".oh-my-zsh/custom/plugins/zsh-syntax-highlighting"]
    type = "archive"
    url = "https://github.com/zsh-users/zsh-syntax-highlighting/archive/master.tar.gz"
    exact = true
    stripComponents = 1
    refreshPeriod = "168h"

# PowerLevel10k theme
[".oh-my-zsh/custom/themes/powerlevel10k"]
    type = "archive"
    url = "https://github.com/romkatv/powerlevel10k/archive/v1.15.0.tar.gz"
    exact = true
    stripComponents = 1

# Vim plugin manager
[".vim/autoload/plug.vim"]
    type = "file"
    url = "https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim"
    refreshPeriod = "168h"
```

### Download Latest GitHub Release Assets

```toml
[".local/bin/zellij"]
    type = "archive-file"
    url = {{ gitHubLatestReleaseAssetURL "zellij-org/zellij" "zellij-x86_64-unknown-linux-musl.tar.gz" | quote }}
    executable = true
    path = "zellij"

# Platform-specific binary
{{ $ageVersion := "1.1.1" -}}
[".local/bin/age"]
    type = "archive-file"
    url = "https://github.com/FiloSottile/age/releases/download/v{{ $ageVersion }}/age-v{{ $ageVersion }}-{{ .chezmoi.os }}-{{ .chezmoi.arch }}.tar.gz"
    path = "age/age"
```

### Refresh External Archives

```shell
# Force refresh of all external archives
chezmoi --refresh-externals apply
chezmoi -R apply
```

## Conditional File Ignoring with `.chezmoiignore`

Create a templated `.chezmoiignore` file for machine-specific file exclusion.

```go-template
# Always ignore
README.md
LICENSE

# Ignore macOS-specific files on non-macOS systems
{{ if ne .chezmoi.os "darwin" }}
Library/Application Support/
.Brewfile
{{ end }}

# Ignore Linux-specific files on non-Linux systems
{{ if ne .chezmoi.os "linux" }}
.config/systemd/
{{ end }}

# Ignore work-related files on non-work machines
{{- if ne .chezmoi.hostname "work-laptop" }}
.work/
.config/work/
{{- end }}

# Exclusion patterns (negate with !)
dir/f*
!dir/foo
```

View currently ignored files:

```shell
chezmoi ignored
```

## Initialization Prompts

Use prompts in `.chezmoi.toml.tmpl` to gather machine-specific configuration during `chezmoi init`.

### String Prompts

```go-template
{{ $email := promptStringOnce . "email" "What is your email address" -}}
{{ $gituser := promptStringOnce . "gituser" "What is your GitHub username" -}}

[data]
    email = {{ $email | quote }}
    gituser = {{ $gituser | quote }}
```

### Choice Prompts

```go-template
{{- $choices := list "desktop" "laptop" "server" "termux" -}}
{{- $hosttype := promptChoiceOnce . "hosttype" "What type of host are you on" $choices -}}

{{- $editorChoices := list "vim" "nvim" "code" "emacs" -}}
{{- $editor := promptChoiceOnce . "editor" "What is your preferred editor" $editorChoices -}}

[data]
    hosttype = {{ $hosttype | quote }}
    editor = {{ $editor | quote }}
```

### Boolean Prompts

```go-template
{{- $workLaptop := promptBoolOnce . "workLaptop" "Is this a work laptop" -}}

[data]
    workLaptop = {{ $workLaptop }}
```

### Test Prompts

```shell
# Test initialization prompts
chezmoi execute-template --init --promptString "email=me@home.org" < ~/.local/share/chezmoi/.chezmoi.toml.tmpl
```

## Encryption with Age

Age provides simpler, more modern encryption than GPG.

### Setup

```shell
# Generate age key
age-keygen -o ~/.config/chezmoi/key.txt

# Or with chezmoi
chezmoi age-keygen --output=$HOME/.config/chezmoi/key.txt
```

### Configure chezmoi

```toml
# chezmoi.toml
encryption = "age"
[age]
    identity = "~/.config/chezmoi/key.txt"
    recipient = "age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p"
```

### Symmetric Encryption with Passphrase

```toml
encryption = "age"
[age]
    passphrase = true
```

### Encrypt Sensitive Files

```shell
# Add encrypted file
chezmoi add --encrypt ~/.ssh/id_rsa

# Edit encrypted file (auto decrypt/encrypt)
chezmoi edit ~/.ssh/id_rsa

# View encrypted file contents
chezmoi cat ~/.ssh/id_rsa
```

### Password-Protected Key

Generate a passphrase-protected key:

```shell
chezmoi age-keygen | chezmoi age encrypt --passphrase --output=key.txt.age
```

Auto-decrypt with a run script (`run_onchange_before_decrypt-private-key.sh.tmpl`):

```shell
#!/bin/sh

if [ ! -f "${HOME}/.config/chezmoi/key.txt" ]; then
    mkdir -p "${HOME}/.config/chezmoi"
    chezmoi age decrypt --output "${HOME}/.config/chezmoi/key.txt" --passphrase "{{ .chezmoi.sourceDir }}/key.txt.age"
    chmod 600 "${HOME}/.config/chezmoi/key.txt"
fi
```

## Run Scripts

### Script Types

| Prefix           | Description                              |
| ---------------- | ---------------------------------------- |
| `run_`           | Run every time `chezmoi apply` is called |
| `run_once_`      | Run only once; state tracked by chezmoi  |
| `run_onchange_`  | Run when script content changes          |
| `run_before_`    | Run before other changes                 |
| `run_after_`     | Run after other changes                  |

### One-Time Setup Script

`run_once_install-packages.sh.tmpl`:

```shell
#!/bin/bash

set -e

{{ if eq .chezmoi.os "linux" -}}
if command -v apt-get >/dev/null; then
    sudo apt-get update
    sudo apt-get install -y git vim tmux
elif command -v dnf >/dev/null; then
    sudo dnf install -y git vim tmux
fi
{{- else if eq .chezmoi.os "darwin" -}}
brew install git vim tmux
{{- end }}
```

### On-Change Script (Hash-Based)

`run_onchange_install-vim-plugins.sh`:

```shell
#!/bin/bash

# vim-plugins hash: {{ include "dot_vimrc" | sha256sum }}
vim +PluginInstall +qall
```

### Daily/Weekly Scripts

Run once per day:

```go-template
#!/bin/sh

# {{ now | date "2006-01-02" }}
echo "Daily maintenance task"
```

Run once per week:

```go-template
#!/bin/sh

# {{ div now.YearDay 7 }}
echo "Weekly maintenance task"
```

### Script Environment Variables

```toml
# chezmoi.toml
[scriptEnv]
    MY_VAR = "my_value"
```

### Clear Script State

```shell
# Clear run_once_ script state
chezmoi state delete-bucket --bucket=scriptState

# Clear run_onchange_ state
chezmoi state delete-bucket --bucket=entryState
```

## Debugging Templates

### View Available Data

```shell
# View all template data
chezmoi data
```

### Test Templates

```shell
# Test single expression
chezmoi execute-template '{{ .chezmoi.hostname }}'

# Test complex expression
chezmoi execute-template '{{ if eq .chezmoi.os "linux" }}Linux{{ else }}Not Linux{{ end }}'

# Test entire template file
chezmoi cd
chezmoi execute-template < dot_zshrc.tmpl

# Test with pipe
cat foo.txt | chezmoi execute-template
```

### Preview Changes

```shell
# Show differences
chezmoi diff

# Show what would change for specific file
chezmoi diff ~/.bashrc

# Show reverse diff
chezmoi diff --reverse
```

## Hooks

Run commands before or after chezmoi operations.

```toml
# chezmoi.toml
[hooks.read-source-state.pre]
    command = "echo"
    args = ["pre-read-source-state-hook"]

[hooks.apply.post]
    command = "echo"
    args = ["post-apply-hook"]
```

## Best Practices Summary

1. **Use whitespace control** (`{{-` and `-}}`) to avoid blank lines
2. **Centralize machine detection** in `.chezmoi.toml.tmpl` with custom variables
3. **Use `.chezmoitemplates/`** for reusable template partials
4. **Integrate with password managers** instead of storing secrets
5. **Use `.chezmoiexternal.toml`** for third-party plugins/tools
6. **Template your `.chezmoiignore`** for machine-specific exclusions
7. **Use prompt functions** for flexible initialization
8. **Encrypt sensitive files** with Age
9. **Use appropriate run scripts** (`run_once_`, `run_onchange_`)
10. **Test templates** before applying with `chezmoi execute-template`

## Resources

- [Chezmoi Documentation](https://www.chezmoi.io/)
- [Chezmoi GitHub Repository](https://github.com/twpayne/chezmoi)
- [Chezmoi Quick Start](https://www.chezmoi.io/quick-start/)
- [Template Functions Reference](https://www.chezmoi.io/reference/templates/)
