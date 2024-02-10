output "public_subnet_id" {
     value = aws_subnet.public_subnet.id
}

output "instance_public_ip" {
     value = aws_instance.web.public_ip
}