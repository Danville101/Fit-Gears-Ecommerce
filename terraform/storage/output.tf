output "database_bucket_arn" {
     value = aws_s3_bucket.data_base_file.arn
}

output "database_bucket_id" {
     value = aws_s3_bucket.data_base_file.id
}

output "database_bucket_url" {
     value = aws_s3_bucket.data_base_file.bucket_domain_name
}

