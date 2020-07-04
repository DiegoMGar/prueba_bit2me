docker run -d --rm -p 27017:27017 --name mongo-bittome -d mongo

docker run -it --rm --link mongo-bittome:mongo mongo mongo --host mongo-bittome test
