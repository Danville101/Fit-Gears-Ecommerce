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
    gateway_id = module.vpc.main_vpc_id
  }
  
}


resource "aws_route_table_association" "internet_access_rt_association" {
   route_table_id = aws_route_table.internet_access_rt
   subnet_id = aws_subnet.public_subnet.id
}


resource "aws_security_group" "public_access_sg" {
     name = "public_access_sg"
     description = "allows internet access"

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

 # ingress {
 #   from_port   = 22
 #   to_port     = 22
 #   protocol    = "tcp"
 #   cidr_blocks = ["10.0.0.0/0"]  
 # }

 
}