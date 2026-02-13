---
title: docker
date: 2021-06-01
toc: true
summary: A cheatsheet for some docker container magic. Docker has its own quirks, so this is a way for me to remember and reuse some of this without trying to formalize it into a standardized repo.
comments: true
tags:
  - development
  - docker
---

## Buildx

> Docker Buildx is a CLI plugin that extends the Docker command with the full support of the features provided by the Moby BuildKit builder toolkit. It provides the same user experience as docker build with many new features like creating scoped builder instances and building against multiple nodes concurrently. [^docker-buildx]

Enable:

    DOCKER_BUILDKIT=1

[Set as default builder](https://docs.docker.com/buildx/working-with-buildx/#set-buildx-as-the-default-builder)

## Resources
...
The majority of the code examples apply to a base image of Ubuntu & Debian.

Since this image has GCC prebaked in, it's much easier to use with dotnet tools and other apps that require it.

## Arguments

[Understand how ARG and FROM interact.](https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact)

The manual triggering of build can be done via the command below, replacing `codespace` with whatever tagged image name is desired.

    docker build --pull --rm -f ".devcontainer/Dockerfile" -t codespace:latest ".devcontainer"```

## Installation Scripts

Clone the `microsoft/vscode-dev-containers` repo and then copy the `script-library` directory to `${ProjectDirectory}/.devcontainer/script-library`.

## Syntax Tips
...

## User Configuration

Using dotfiles with [Chezmoi](https://www.chezmoi.io/), manually trigger using a command such as:

```shell
# Install chezmoi
sh -c "$(curl -fsLS get.chezmoi.io)"

# Initialize and apply dotfiles (replace with your GitHub username)
chezmoi init --apply --verbose https://github.com/$GITHUB_USERNAME/dotfiles.git
```

For automated Docker/Codespaces setup, you can use environment variables:

```shell
# One-liner with GITHUB_USERNAME environment variable
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply --verbose "https://github.com/${GITHUB_USERNAME}/dotfiles.git"
```

See the [chezmoi notes](/notes/chezmoi/) for comprehensive templating best practices.

## Environment Variables

## Homebrew

You can install Homebrew for Linux in two different ways, using a multi-stage build, or the vscode install script [homebrew-debian.sh](https://github.com/microsoft/vscode-dev-containers/blob/main/script-library/homebrew-debian.sh)

A multistage would do this:

...

## Go-Task

    version: '3'
    silent: true
    output: prefixed
    vars:
...

## Full Dockerfile Examples

### Codespaces - Ubuntu General Development Build

This is a general-purpose dev container for dev tooling such as Python3, Go, PowerShell, pre-commit, and other useful tools.

...

The end goal is to provide mounting of AWS local credentials into the container, use volumes for high IO package/artifact directories, and improve the drive performance by marking the container as the primary and the host directory as mounted. The version should be okay to lag a bit.

      "workspaceMount": "source=${localWorkspaceFolder},target=/home/codespace/workspace,type=bind,consistency=delegated",
      "mounts": [
        "source=vscodeextensions,target=/root/.vscode-server/extensions,type=volume",
        "source=artifacts,target=${containerWorkspaceFolder}/artifacts,type=volume",
        "source=packages,target=${containerWorkspaceFolder}/packages,type=volume",
        "source=tools,target=${containerWorkspaceFolder}/tools,type=volume",
        "source=${localEnv:HOME}${localEnv:USERPROFILE}/.aws/credentials,target=/home/codespace/.aws/credentials,type=bind,consistency=delegated",
      ],
      "postCreateCommand": [
        "uname -a",
        "pre-commit install"
      ],
    // Set *default* container specific settings.json values on container create.
      "settings": {
...


