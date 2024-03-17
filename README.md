a place for uploading your personal projects

### install using docker
1. install the image
2. forward the `80`-port to your desired port
3. provide a `degu` config file:
    - define it in your docker compose:
        ```yaml
        # your docker-compose.yaml file
        apps:
            image: registry.gitlab.com/constorux/appspace
            ports:
                - "80:80"
            volumes:        
                - /path/to/degu.yaml:/app/degu.yaml
        ```
    - use this format: <br>
        ```yaml
        # the degu.yaml file
        config:
            message: "my personal projects"

        apps:
            disko:
                ref: https://raw.githubusercontent.com/RobinNaumann/disko/main/degu.yaml
            openLists:
                ref: https://gl.githack.com/constorux/open_lists/-/raw/main/degu.yaml
        ```