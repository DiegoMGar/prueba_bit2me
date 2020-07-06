# prueba_bittome
Prueba técnica de Bit2me

## Estado
Prueba técnica finalizada.  
Desplegado en un **Aws EC2 t2.nano de París**
- [Backend](http://ec2-15-236-212-50.eu-west-3.compute.amazonaws.com)
    - [Swagger](http://ec2-15-236-212-50.eu-west-3.compute.amazonaws.com/docs)
    - [Histórico BTC](http://ec2-15-236-212-50.eu-west-3.compute.amazonaws.com/api/historical/btc)
    - [Histórico ETh](http://ec2-15-236-212-50.eu-west-3.compute.amazonaws.com/api/historical/eth)
- [Frontend](http://dcgf24ri60ypn.cloudfront.net)
- [Cluster Kubernetes (Aws EKS)](eks)

## Introducción
Durante la realización de esta prueba ningún sistema hardware ha sufrido daño alguno.  
- Se ha llevado a cabo desarrollando en win10home + webstorm + dockerToolbox  
- Se ha empleado una aproximación simple a lo que sería un proyecto extensible con DDD
- Se ha separado en `/app` la lógica relacionada con el `i/o`
- Se ha separado en `/domain` el funcionamiento de la aplicación adhoc
    - Separando las capas de `repository` capa de acceso a datos y `services` mapeo y tratamiento de datos.
    - Haciendo una capa separada para funcionalidades de funcionamiento muy concreto `coinmarketcap api` y `automailing`
- No se ha hecho testing unitario dado la simplicidad de la implementación
    - Se ha hecho testing de integración de automail y capas de datos para que se vea mi compresión del testing y el uso de chai   
- Se ha usado Git `master` + `feature/<desarrolloencurso>` publicando en github y pidiendo Pull Resquest para las mezclas.
- El frontend es desantedido por decisión de arquitectura, disponibilidad y escalabilidad
    - Se va a usar CloudFront de Aws para distribuir el frontend directamente en el edge.

## Metas
- Consumir api externa
- Uso de gitflow
- Backend api rest con node
- Documentar api rest con swagger
- Integrar backend con mongo y redis usando docker
- Emails automáticos
- Frontend desatentido y websockets
- Testing unitario
- Dockerizar solución
- Winston para logs
- Despliegue en gcloud sobre kubernetes

## Solución

La prueba se ha afrontado con las siguientes pautas:
- Uso de git para la CI, master y ramas feature.
- Publicado en Github
- Node `v14.5` con imports `ES6`
- Swagger resuelto desde paquetería en `/docs`
- Persistencia en mongo y redis usando docker
- Mensajería por email usando `SES` de Aws
- Cluster de kubernetes usando `Eks` de Aws
- Websockets
- Testing con `chai`
- Frontend resuelto desde `CloudFront`

## External api

- coinmarketcap
  - [Top 100 Cryptocurrencies by Market Capitalization](https://coinmarketcap.com/api/documentation/v1/)
- Canvasjs para gráficas en el frontend
    - [CanvasJS Beautiful HTML5 Charts & Graphs](https://canvasjs.com/javascript-charts/)

### Misc

Se usan @types/package para facilitar el autocompletado del IDE.
- Instalados como dev dependency

### Guía de uso
- Instalar node y yarn
- Crear un `.env` en raiz con los valores adecuados, ejemplo en `.env-example`
- `yarn install` para instalar todas las dependencias
- Para que la aplicación funcione con normalidad hace falta que estén disponibles **mongo** y **redis**.
    - Posibilidad de tener docker en local o instalados
        - Hay comandos de ayuda para arrancarlos con `docker` en la carpeta `docker/(mongo|redis)/*.docker.sh`
        - *Conectar contenedores añadiendo alias a la network es mucho más sencillo.*
    - Posibilidad de poner ip/url externas en `.env`
    - El comando `yarn run start:docker` usa la network `bit2me-network` y el fichero `.env` de la carpeta raiz
- `mocha -r dotenv/config <ruta>/<ficherotest>.spec.js` para ejecutar un test en concreto
- `mocha -r dotenv/config /test/**/*.spec.js` para ejecutar todos los test
    - Si no está configurado el AwsCli y la cuenta tiene habilitado el SES, no funcionará el mailing.
- `yarn start` para arrancar la aplicación
    - Usará el puerto que se le indique en `.env`
- El servidor además de resolver api rest hace dos tareas específicas:
    - Cada 60 segundos pide info a coinmarketcap y la almacena en mongo
    - Cada 2 horas manda un email automático con los precios de los últimos 100 segundos.
- El api rest está documentada con `swagger` en la ruta `/docs`
- El frontend es un html independiente que puede abrirse directamente con el navegador.
    - Hace una primera petición y carga los precios
    - Queda a la espera de actualizarse por websocket.

### Posibles mejoras

- **La facilidad de programar y la velocidad que proporcionan los IDE modernos usando
Typescript lo considero una ventaja.**
- Las funcionalidades tan específicas, como el envío de emails automáticos o la recogida de datos deberían
hacerse mediante workers o servicios desanidados del proceso principal.
- La aproximación inicial que tomé es conexión y desconexión a la base de datos por cada consulta,
no es óptimo, es mucho más eficiente una conexión para todos y desconectar en caso de un delay sin uso.
- Los websockets son un problema para aplicaciones con mucha afluencia de usuarios, se podría hacer una
aproximación a esta funcionalidad por streams usando EventSources en un worker específico.
    - [MDN EventSource Reference](https://developer.mozilla.org/es/docs/Web/API/EventSource)
- Dockerizar bases de datos puede ser un error de arquitectura, hay una discusión muy amplia en la comunidad sobre
los peligros de dockerizar bases de datos y las complicaciones de las copias de seguridad y lo tedioso de las réplicas
y la alta disponibilidad.
    - Si la solución va a ser full cloud, sería muy interesante usar bases de datos como servicios del cloud
    en lugar de reinventar la rueda.
    - [Amazon Redshift](https://aws.amazon.com/es/redshift/)
    - [Amazon Aurora](https://aws.amazon.com/es/rds/aurora/)
    - [Amazon DynamoDB](https://aws.amazon.com/es/dynamodb/) *serverless*
    - [Amazon ElastiCache](https://aws.amazon.com/es/elasticache/) *redis*
- 60 segundos de caducidad de caché apostaría por que es poco, podría ser interesante que el caché tardase más en
caducar y que el worker que vuelca a mongo publicase también, si el caché está en tiempo de uso, esos datos a caché.
    - Un flag que marca que el caché se considera demandado.
    - El worker actualiza mongo y, si el flag lo indica, redis.
- Https desde node con express es un poco tedioso de más, en mi experiencia, puede ser más sencillo un proxy con nginx y que
el servicio de api esté en redes privadas por http, usar un [Amazon API Gateway](https://aws.amazon.com/es/api-gateway/)
o un balanceador en caso de escalabilidad horizontal.