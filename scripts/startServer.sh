echo startServer
pushd /home/ec2-user/application/api
pm2 start ./dist/index.js --name "APIBackend"
popd
pushd /home/ec2-user/application/client
pm2 start ./node_modules/react-scripts/scripts/start.js --name "ReactClient"
popd
echo done