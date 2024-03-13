#!/bin/zsh
## NOTE: make script executable: chmod +x deploy.sh

name="registry.gitlab.com/constorux/appspace"

# Build
npm run build

# Docker: create Image and push
docker build -t "$name" .
docker push "$name"