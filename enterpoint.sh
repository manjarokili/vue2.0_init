#!/bin/bash
set -e

find /etc/nginx -name 'default.conf' | xargs sed -i "s V_SERVER_NAME $SERVER_NAME g"
find /usr/share/nginx/html -name '*.js' | xargs sed -i "s http://top.quanyou.com.cn $IMAGE_PREFIX g"

cat /etc/nginx/conf.d/default.conf

exec "$@"
