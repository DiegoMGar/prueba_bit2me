# prueba_bittome
Prueba técnica de Bit2me

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
