echo startServer
pushd /home/ec2-user/application/api
nohup npm start &
disown
popd
pushd /home/ec2-user/application/client
nohup yarn start &
disown
popd
echo done
