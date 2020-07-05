# prueba_bittome
Prueba técnica de Bit2me

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
    - Posibilidad de poner ip/url externas en `.env`
- `mocha -r dotenv/config <ruta>/<ficherotest>.spec.js` para ejecutar un test en concreto
- `mocha -r dotenv/config /test/**/*.spec.js` para ejecutar todos los test
    - Si no está configurado el AwsCli y la cuenta tiene habilidato el SES no funcionará el mailing.
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