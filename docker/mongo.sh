docker run -d --rm -p 27017:27017 --name mongo-bittome -v C:\Users\diego\WebstormProjects\bittome\prueba_bittome\docker\mongodb_db:/data/db -d mongo

docker run -it --rm --link mongo-bittome:mongo mongo mongo --host mongo-bittome test
