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


             ## PUBLIC RESOURCES ##
resource "aws_subnet" "public_subnet" {
     vpc_id =  aws_vpc.fit_gear_vpc.id
     cidr_block = "10.0.0.0/24"
}


resource "aws_route_table" "internet_access_rt" {
     vpc_id =  aws_vpc.fit_gear_vpc.id
   route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.fit_gear_igw.id
  }
  
}


resource "aws_route_table_association" "internet_access_rt_association" {
   route_table_id = aws_route_table.internet_access_rt.id
   subnet_id = aws_subnet.public_subnet.id
}


resource "aws_security_group" "public_access_sg" {
     name = "public_access_sg"
     description = "allows internet access"
     vpc_id =  aws_vpc.fit_gear_vpc.id

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

              ## PUBLIC RESOURCES ##

             ## PRIVATE RESOURCES ##

resource "aws_subnet" "private_subnet" {
  vpc_id =  aws_vpc.fit_gear_vpc.id
  cidr_block = "10.0.0.1/24"
}


resource "aws_nat_gateway" "fit_gear_ngw" {
     subnet_id =  aws_subnet.public_subnet.id
     depends_on = [ aws_internet_gateway.fit_gear_igw.id ]

  
}

resource "aws_route_table" "nat_internet_access_rt" {
     vpc_id =  aws_vpc.fit_gear_vpc.id
   route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.fit_gear_ngw.id
  }
  
}


resource "aws_route_table_association" "nat_internet_access_rt_association" {
   route_table_id = aws_route_table.nat_internet_access_rt.id
   subnet_id = aws_subnet.private_subnet.id
}


resource "aws_security_group" "private_access_sg" {
     name = "private_access_sg"
     description = "allows ssh to private resources"
     vpc_id =  aws_vpc.fit_gear_vpc.id


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


     ## PRIVATE RESOURCES ##