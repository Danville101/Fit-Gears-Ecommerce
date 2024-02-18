output "main_vpc_id" {
     value = aws_vpc.fit_gear_vpc.id
  
}

output "internet_gateway_id" {
  value = aws_internet_gateway.fit_gear_igw.id
}

output "public_subnet_id"{
  value = aws_subnet.public_subnet.id
}
output "private_subnet_id"{
  value = aws_subnet.private_subnet.id
}

output "public_security_group_id"{
  value = aws_security_group.public_access_sg.id
}
output "private_security_group_id"{
  value = aws_security_group.private_access_sg.id
}