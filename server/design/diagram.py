from diagrams import Cluster, Diagram
from diagrams.aws.compute import ECS
from diagrams.aws.database import ElastiCache, RDS,Database, Aurora
from diagrams.aws.database import 
from diagrams.aws.network import ELB
from diagrams.aws.network import Route53
from diagrams.aws.storage import S3

with Diagram("Clustered Web Services", show=False):
    dns = Route53("dns")
    lb = ELB("ALB")
    lb2 = ELB("NLB")

    with Cluster("Services"):
        svc_group = [ECS("web1"),
                     ECS("web2"),
                     ECS("web3")]

    with Cluster("Server Cluster"):
                svc_group2 = [ECS("server2"),
                     ECS("server2"),
                     ECS("server2")]

    db = Aurora("database")
    s3 = S3("s3")

    dns >> lb >> svc_group
    svc_group >> lb2
    lb2>> svc_group2
    svc_group2 >> db
    svc_group2 >> s3
