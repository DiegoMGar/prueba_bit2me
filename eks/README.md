# Despliegue cluster Kubernetes en AWS

Para el despliegue del cluster de Kubernetes de esta prueba técnica se ha usado Aws.  
En la prueba se pide GCloud por capa gratuita, pero no soy elegible, y como Aws lo manejor mejor
y tengo más controlados los precios, además de venirme bien como entranmiento.
La prueba se ha resuelto usando EKS [Amazon Elastic Kubernetes Service](https://aws.amazon.com/es/eks/)

Ha sido una práctica muy didáctica, me estoy preparando el examen
de administrador de kubernetes de hace poco y aún no había puesto en práctica los conocimientos
en cloud. También me estoy preparando el examen de arquitecto de Aws y
conocía EKS sólo de forma teórica.  

Adjunto evidencia guiada del arranque, configuración, despliegue y funcionamiento del cluster.
- Kube Plane desplegado con un nodo disponible [Node01 - EKS](node01andec2.png)
- Deployments, Services y Webapp log, funcionando y conectando [Deployments en terminal](servicesandlogs.png)
- NodePort configurado para exponer la webapp a internet [NodePort](NodePortservice.png)
- Dashboard de ec2 para ver la coincidencia de tipo instancia y usar dns pública [EC2 Instance](ec2andpublicdns.png)
- Petición a raiz de la webapp para comprobar respuesta [Raiz webapp](peticionwebraiz.png)
- Petición de precios resuelve mongo, no hay caché [Resuelve mongo](mongoresolver.png)
- Petición de precios resuelve redis, hay caché [Resuelve redis](redisresolver.png)

Tumbé el cluster para que no suba el coste, la app con 3 las imágenes docker estará funcionando
toda la semana en una instancia mucho más económica que la necesaria para hacer usable eks.

El frontend resuelve por CloudFront.