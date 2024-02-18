#!/bin/bash
sudo apt-get update
sudo apt-get install nginx -y
source /.env
export AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY"

sudo apt install awscli -y
sudo cd ~
sudo mkdir /home/datafile

sudo datatfile="/home/datafile/sourcedb.sql"
sudo if [ -e "$datafile" ] ; then
    echo "file exists"
else
   aws s3 cp s3://fit-gear-database/sourcedb.sql  /home/datafile/
fi

sudo apt install docker.io -y 
sudo systemctl enable docker
cd /home/datafile
sudo echo '# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB Ecom5
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD villabean101

# Copy the SQL dump file into the container
COPY ./sourcedb.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432

# Optionally, you can provide additional configuration files if needed
# COPY ./my_postgresql_conf.conf /etc/postgresql/my_postgresql_conf.conf

# The CMD instruction specifies the command to run when the container starts
CMD ["postgres"]
' >> Dockerfile


sudo docker build -t postgresdb .
sudo docker run -p 5432:5432 postgresdb
