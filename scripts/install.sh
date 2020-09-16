echo preinstall
pushd /home/ec2-user/application/api
npm install >> /home/ec2-user/log.txt
popd
pushd /home/ec2-user/application/client
yarn add
popd
echo done
