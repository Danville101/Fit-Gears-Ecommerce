module "client" {
     source = "../client"
     
}

resource "aws_vpc" "fit_gear_vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "fit_gear_vpc"
  }
}


resource "aws_internet_gateway" "fit_gear_igw" {
  vpc_id = aws_vpc.fit_gear_vpc.id

  tags = {
    Name = "fit_gear_igw"
  }
}


resource "aws_nat_gateway" "fit_gear_ngw" {
     subnet_id =  module.client.public_subnet_id
     depends_on = [ aws_internet_gateway.fit_gear_igw ]

  
}