# SERVICIO MONGO
docker run -d --rm -p 27017:27017 --name mongo-bittome -d mongo

# CLIENTE MONGO (LINK ESTÁ OBSOLETO, ES MEJOR USAR NETWORKS)
docker run -it --rm --link mongo-bittome:mongo mongo mongo --host mongo-bittome test
