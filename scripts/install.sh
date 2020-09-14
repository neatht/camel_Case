echo preinstall
pushd /home/ec2-user/application/api
npm install
popd
pushd /home/ec2-user/application/client
yarn add
popd
echo done
