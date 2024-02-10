module "vpc" {
  source = "../vpc"
}

resource "aws_subnet" "public_subnet" {
     vpc_id =  module.vpc.main_vpc_id
     cidr_block = "10.0.0.0/24"
}


resource "aws_route_table" "internet_access_rt" {
     vpc_id = module.vpc.main_vpc_id
   route {
    cidr_block = "0.0.0.0/0"
    gateway_id = module.vpc.internet_gateway_id
  }
  
}


resource "aws_route_table_association" "internet_access_rt_association" {
   route_table_id = aws_route_table.internet_access_rt.id
   subnet_id = aws_subnet.public_subnet.id
}


resource "aws_security_group" "public_access_sg" {
     name = "public_access_sg"
     description = "allows internet access"
     vpc_id = module.vpc.main_vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  
  }

 egress {
     from_port = 0
     to_port =  0
     protocol =  "-1"
     cidr_blocks = ["0.0.0.0/0"]
 }
 
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

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  subnet_id = aws_subnet.public_subnet.id
  vpc_security_group_ids =  [aws_security_group.public_access_sg.id]
  associate_public_ip_address = true

  key_name = "ec2_key_pair"

provisioner "remote-exec" {

inline = [ "touch hello.txt",
"echo hello world from  ec2 >> hello.txt" ]
}

connection {
  type = "ssh"
  host =  self.public_ip
  user =   "ubuntu"
  private_key = file("./ec2_key_pair")
  timeout = "4m"

}

  
  tags = {
    Name = "web_server"
  }


}


#resource "aws_nat_gateway" "fit_gear_ngw" {
#     subnet_id =  aws_subnet.public_subnet.id
#     depends_on = [ module.vpc.internet_gateway_id ]
#
#  
#}

resource "aws_key_pair" "dev_pair" {
     key_name = "ec2_key_pair"
     public_key = "" #place public key right here 
  
}