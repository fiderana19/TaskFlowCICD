output "instance_id" {
  value = aws_instance.main.id
}

output "public_ip" {
  value = aws_instance.main.public_ip
}

output "availability_zone" {
  value = aws_instance.main.availability_zone
}