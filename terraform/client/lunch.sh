#!/bin/bash
sudo apt-get update
sudo apt-get install nginx -y
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - 
sudo apt-get install -y nodejs
sudo apt install npm -y



echo 'server{
     listen 80;
     server_name '$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)' ;
     location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade' ;
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
     }
}' >> /etc/nginx/sites-available/default 

cd ~
mkdir -p home/client
chmod 700 home/client
npm install pm2 -g



sudo systemctl start nginx

