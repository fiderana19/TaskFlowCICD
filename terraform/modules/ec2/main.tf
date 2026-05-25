resource "aws_instance" "main" {
  ami = "ami-0f021a2f2aadc4b9b"
  instance_type = var.instance_type
  subnet_id = var.subnet_id
  key_name = var.key_name
  vpc_security_group_ids = [
    var.security_group_id
  ]
  associate_public_ip_address = true
  user_data = file("${path.module}/userdata.sh")

  root_block_device {
    volume_size = 8
    volume_type = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "devops-prod-server"
  }
}