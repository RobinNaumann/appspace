# Step 1: Specify the base image
FROM  --platform=linux/amd64 nginx:alpine

# Step 2: Copy application code into Docker image
COPY ./docs /app

# Step 3: Copy the Nginx configuration file
COPY nginx_config.conf /etc/nginx/conf.d/default.conf


# npm run build
# docker build -t registry.gitlab.com/constorux/appspace .
# docker push registry.gitlab.com/constorux/appspace
# or run deploy.sh