#!/bin/bash

sudo apt-get update 
sudo apt install python3 -y
sudo apt-get install nginx -y
sudo apt install python3-pip -y
sudo apt install uvicorn -y
sudo apt install pipenv -y

echo 'server{
     listen 80;
     server_name '$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)' ;
     location / {
          proxy_pass http://localhost:8000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade' ;
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
     }
}' >> /etc/nginx/sites-available/default 

pip3 install psycopg2-binary


pip3 install aiofiles==22.1.0
pip3 install alembic==1.4.3
pip3 install argon2-cffi==21.3.0
pip3 install argon2-cffi-bindings==21.2.0
pip3 install bcrypt==4.0.1
pip3 install certifi==2022.12.7
pip3 install cffi==1.15.1
pip3 install charset-normalizer==3.0.1
pip3 install click==7.1.2
pip3 install fastapi==0.63.0
pip3 install Flask==1.1.4
pip3 install h11==0.11.0
pip3 install idna==3.4
pip3 install itsdangerous==1.1.0
pip3 install Jinja2==2.11.3
pip3 install joblib==1.2.0
pip3 install Mako==1.1.3
pip3 install MarkupSafe==1.1.1
pip3 install numpy==1.24.2
pip3 install pandas==1.5.3
pip3 install passlib==1.7.4
pip3 install Pillow==9.4.0
pip3 install pycparser==2.21
pip3 install pydantic==1.7.3
pip3 install PyJWT==2.6.0
pip3 install python-dateutil==2.8.1
pip3 install python-editor==1.0.4
pip3 install python-multipart==0.0.5
pip3 install pytz==2022.7.1
pip3 install requests==2.28.2
pip3 install scikit-learn==1.2.0
pip3 install scipy==1.10.0
pip3 install six==1.15.0
pip3 install SQLAlchemy==1.3.22
pip3 install starlette==0.13.6
pip3 install stripe==5.1.1
pip3 install threadpoolctl==3.1.0
pip3 install urllib3==1.26.14
pip3 install uvicorn==0.13.2
pip3 install Werkzeug==1.0.1


sudo systemctl start nginx

