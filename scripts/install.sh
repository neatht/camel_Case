echo preinstall
pushd /home/ec2-user/application/api
npm install
npm run build
popd
pushd /home/ec2-user/application/client
yarn install
yarn build
popd
echo done
