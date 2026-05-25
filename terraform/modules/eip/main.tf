resource "aws_eip" "main" {
    domain = "vpc"

    tags = {
        Name = "eip-taskflow-server"
    }
}