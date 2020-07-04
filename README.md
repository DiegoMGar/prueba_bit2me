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
- Node v14.5 con imports ES6
- Swagger resuelto desde paquetería en /docs
- Persistencia en mongo y redis usando docker
- Mensajería por email usando SES de AWS
- Websockets
- Testing con chai

## External api

- coinmarketcap
  - https://coinmarketcap.com/api/documentation/v1/

### Misc

Se usan @types/package para facilitar el autocompletado del IDE.
- Instalados como dev dependency 
