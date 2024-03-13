#!/bin/zsh
# make script executable: chmod +x deploy.sh
name="registry.gitlab.com/constorux/peertest"

# Build
npm run build

# Docker: create Image and push
docker build -t "$name" .
docker push "$name"