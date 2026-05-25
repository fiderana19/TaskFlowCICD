terraform {
  backend "s3" {
    bucket = "terraform-bucket-fiderana19"
    region = "us-east-1"
  }
}

module "vpc" {
  source = "../modules/vpc"
}

module "security_group" {
  source = "../modules/security_groups"
  vpc_id = module.vpc.vpc_id
}

module "ec2" {
  source = "../modules/ec2"
  instance_type = var.instance_type
  key_name = var.key_name
  subnet_id = module.vpc.public_subnet_id
  security_group_id = module.security_group.security_group_id
}

module "eip" {
  source      = "../modules/eip"
}

resource "aws_eip_association" "eip_assoc" {
  instance_id = module.ec2.instance_id
  allocation_id = module.eip.output_eip_id
}
