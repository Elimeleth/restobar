docker rm -f mysql 2>/dev/null

docker run \
  --name mysql \
  --network host \
  --expose 3306 \
  -v $(pwd)/database/init.sql:/data/application/init.sql \
  -e MYSQL_ROOT_USER=root \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=restobar \
  -e MYSQL_USER=mysql \
  -e MYSQL_PASSWORD=secret \
  mysql:5.7 --init-file /data/application/init.sql
