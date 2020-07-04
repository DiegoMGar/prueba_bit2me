eksctl create nodegroup --cluster bit2me-cluster --region eu-west-3 ^
--version 1.16 ^
--name node01 ^
--node-type t3.small ^
--nodes 1 ^
--nodes-min 1 ^
--nodes-max 2 ^
--node-volume-size 50 ^
--managed