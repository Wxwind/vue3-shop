#!/bin/bash
## author:wxwind

imageName=vueshopweb
containerName=vueshopwebInstance

echo "stop running cantainer and delete image.."
docker stop $containerName &&
    docker rm $containerName &&
    docker rmi $imageName

echo "delete dangling images"
docker rmi "$(docker images -f "dangling=true" -q)"

echo "build image..."
docker build -t $imageName . &&
    docker run -p 8080:80 -d --name $containerName $imageName
