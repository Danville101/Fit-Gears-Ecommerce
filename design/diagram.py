from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import ElastiCache, RDS,Database, Aurora
from diagrams.aws.network import ELB, InternetGateway, NATGateway
from diagrams.aws.network import Route53
from diagrams.aws.storage import S3
from diagrams.aws.general import User


with Diagram("Clustered Web Services", show=False):
    dns = Route53("dns")
    lb = ELB("ALB")


    with Cluster("fitgears"):
        InternetGateway("IGW")
        with Cluster("VPC"):
  
          with Cluster("public_subnet"):
            with Cluster("public utilities"):
               EC2("Bastion Host")
               NATGateway("NAT")
            svc_group = [EC2("web1"),
                         EC2("web2"),
                         EC2("web3")]
  
          lb2 = ELB("ALB")
          with Cluster("private_subnet"):
            svc_group2 = [EC2("server2"),
                         EC2("server2"),
                         EC2("server2")]
            redis=ElastiCache("redis")
            db = Aurora("database")
          
        s3 = S3("s3")

    dns >> lb >> svc_group
    svc_group >> lb2
    lb2>> svc_group2
    svc_group2 >> db
    svc_group2 >> redis
    svc_group2 >> s3
