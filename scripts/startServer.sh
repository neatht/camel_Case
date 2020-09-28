echo startServer
pushd /home/ec2-user/application/api
pm2 start ./dist/index.js --name "APIBackend" --log "/home/ecc2-user/application/log.txt" --time
popd
echo done