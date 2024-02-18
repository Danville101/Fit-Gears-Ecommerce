resource "aws_s3_bucket" "data_base_file" {
  bucket = "fit-gear-database"

   tags = {
    Name        = "My bucket"
  }
}



 