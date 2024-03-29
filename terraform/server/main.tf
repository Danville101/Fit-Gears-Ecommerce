module "vpc" {
  source = "../vpc"
}

module "database" {
  source = "../database"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  subnet_id = module.vpc.public_subnet_id
  vpc_security_group_ids =  [module.vpc.public_security_group_id]
  associate_public_ip_address = true

  key_name = "ec2_key_pair"

  user_data =  <<-EOF
    #!/bin/bash
    $(cat ./lunch.sh)
  "SQLALCHEMY_DATABASE_URL=postgresql://postgres:villabean101@${module.database.private_ip}/Ecom5"
  EOF


 

provisioner "remote-exec" {
    inline = [
     "cd ~",
      "mkdir -p home/server", // Create the directory if it doesn't exist (-p option to avoid errors if it already exists)
      "chmod 700 home/server", // Set appropriate permissions (e.g., 755)
    ]

    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ubuntu"
      private_key = file("/Users/danvillewilks/Desktop/shh_key_pairs/ec2_key_pair")
    }
  }







  provisioner "local-exec" {
     command =  "rsync -avy --progress -e 'ssh -oStrictHostKeyChecking=no -i ec2_key_pair' /Users/danvillewilks/Desktop/DevOps/FitGears/server ubuntu@${aws_instance.server.public_ip}:~/home  "
  connection {
  type = "ssh"
  host =  aws_instance.server.public_ip
  user =   "ubuntu"
  private_key = file("/Users/danvillewilks/Desktop/shh_key_pairs/ec2_key_pair")

}
}

provisioner "remote-exec" {
    inline = [
     "cd home/server" ,
     "uvicorn app.main:app",
      "sudo systemctl restart nginx"
    ]

    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ubuntu"
      private_key = file("/Users/danvillewilks/Desktop/shh_key_pairs/ec2_key_pair")
    }
  }

  
  tags = {
    Name = "backend_server"
  }


}



data "aws_instance" "server" {
 instance_id = aws_instance.server.id
}


#resource "aws_nat_gateway" "fit_gear_ngw" {
#     subnet_id =  aws_subnet.public_subnet.id
#     depends_on = [ module.vpc.internet_gateway_id ]
#
#  
#}

#resource "null_resource" "file_copy" {
#  depends_on = [ aws_instance.web ]
#
#connection {
#  type = "ssh"
#  host =  aws_instance.web.public_ip
#  user =   "ubuntu"
#  private_key = file("/Users/danvillewilks/Desktop/shh_key_pairs/ec2_key_pair")
#
#}
#
#  provisioner "local-exec" {
#     command =  "rsync -av --progress -e 'ssh -i ec2_key_pair' /Users/danvillewilks/Desktop/DevOps/FitGears/client ubuntu@${aws_instance.web.public_ip}:~/home "
#
#}
#
#
#
#  
#}
#




  



resource "aws_key_pair" "dev_pair" {
     key_name = "ec2_key_pair"
     public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDk8T8Hm1lR2o5PSRBOcmZVl8gTtrVJCdAHqGhJbovS1TKl7gdZEJL3rStadx+Rm/Q4YLx/r8LE3ok2OLo55G7Pxd4iu8sCFTDF2a3rBpBS6rTnZ7rF6yalgCl8uzyl5vK2c9Cs9hPb+Zo43zQjv314Yc4R6rc3/Yo7mQskVG5FxOL04n0gqLP5j+BljOB34i6SRfloep9epqxVRKKPqosUpsRezTq0e8KDtmf5uJleifhuJlfCrc2UPn+XfOwMDo6O5q7hzqCabk8iThIMvHEj0GybvhuikjlhAquV1RfaycVEHor5RItWytqaPYs+auit0l+UFccw0nUk5W9CLSAL danvillewilks@Danvilles-MBP.cust.communityfibre.co.uk" 
  
}