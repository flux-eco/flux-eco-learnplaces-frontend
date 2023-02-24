#!/usr/bin/env sh

set -e

public="`dirname "$0"`/../../public"

installLibrary() {
    (mkdir -p "$public/$1" && cd "$public/$1" && wget -O - "$2" | tar -xz --strip-components=1)
}

installLibrary flux-eco-ui https://github.com/flux-eco/flux-eco-ui/archive/refs/tags/v2023-02-23-1.tar.gz
sh $public/flux-eco-ui/bin/install-libraries.sh