echo startServer
pushd /home/ec2-user/application/api
sudo pm2 start ./dist/index.js --name "APIBackend" --log "/home/ec2-user/application/apilog.txt" --time
popd
pushd /home/ec2-user/application/scripts
sudo pm2 start ./serveReact.sh --name "ReactFrontend" --log "/home/ec2-user/application/reactlog.txt" --time
popd
echo done