echo preInstall
chmod +x /home/ec2-user/application/scripts/install.sh
chown ec2-user /home/ec2-user/application
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5000
