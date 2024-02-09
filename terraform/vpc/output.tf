output "main_vpc_id" {
     value = aws_vpc.fit_gear_vpc.id
  
}

output "internet_gateway_id" {
  value = aws_internet_gateway.fit_gear_igw.id
}