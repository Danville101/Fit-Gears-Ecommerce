module "vpc" {
  source = "../vpc"
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

resource "aws_instance" "db_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  subnet_id = module.vpc.public_subnet_id
  vpc_security_group_ids =  [module.vpc.public_security_group_id]
  associate_public_ip_address = true


  user_data =  file("./lunch.sh")
  iam_instance_profile = aws_iam_instance_profile.instance_profile.name



  
  tags = {
    Name = "db_server"
  }


}

# Create an IAM role
resource "aws_iam_role" "s3_access_role" {
  name = "s3-access-role"
  
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

# Attach policies to IAM role
resource "aws_iam_role_policy_attachment" "s3_access_policy_attachment" {
  role       = aws_iam_role.s3_access_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"  # Adjust policy as needed
}






data "aws_instance" "db_server" {
 instance_id = aws_instance.db_server.id
}







resource "aws_iam_instance_profile" "instance_profile" {
  name = "instance_profile"
  role = "${aws_iam_role.s3_access_role.name}"
}



/* Updated Version
module "vpc" {
  source = "../vpc"
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

resource "aws_instance" "db_server" {
    ebs_block_device {
    device_name = "/dev/sdh"
    volume_id   = aws_ebs_volume.postgres_volume.id
  }

  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  subnet_id = module.vpc.public_subnet_id
  vpc_security_group_ids =  [module.vpc.public_security_group_id]
  associate_public_ip_address = true


  user_data =  file("./lunch.sh")
  iam_instance_profile = aws_iam_instance_profile.instance_profile.name



  
  tags = {
    Name = "db_server"
  }


}

# Create an IAM role
resource "aws_iam_role" "s3_access_role" {
  name = "s3-access-role"
  
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

# Attach policies to IAM role
resource "aws_iam_role_policy_attachment" "s3_access_policy_attachment" {
  role       = aws_iam_role.s3_access_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"  # Adjust policy as needed
}






data "aws_instance" "db_server" {
 instance_id = aws_instance.db_server.id
}







resource "aws_iam_instance_profile" "instance_profile" {
  name = "instance_profile"
  role = "${aws_iam_role.s3_access_role.name}"
}



# Create an EBS volume
resource "aws_ebs_volume" "postgres_volume" {
  availability_zone = "us-east-1a"
  size              = 8 # Size of the volume in gibibytes (GiB)
}

*/