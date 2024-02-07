module "vpc" {
  source = "../vpc"
}

resource "aws_subnet" "public_subnet" {
     vpc_id =  module.vpc.main_vpc_id
     cidr_block = "10.0.0.0/24"
}
