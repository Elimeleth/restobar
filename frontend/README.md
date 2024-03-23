You need node version 14 or lower

__DOCKER__

npm run build

sudo rsync -avz -e 'ssh -p YOUR-PORT' build/ root@YOUR-IP-SERVER:/home/comandera/frontend/build

docker build . -f Dockerfile.dev -t front

docker rm -f front

docker run --restart always -p 3000:3000 --name front front