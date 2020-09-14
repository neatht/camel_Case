echo startServer
pushd /home/ec2-user/application/api
npm start
popd
pushd /home/ec2-user/application/client
yarn start
popd
echo done
