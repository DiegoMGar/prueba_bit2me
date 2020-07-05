export default {
  swagger: "2.0",
  info: {
    description: "Prueba técnica para Bit2me",
    version: "1.0.0",
    title: "Bit2me-web-app",
    contact: {
      email: "diego.diemg@gmail.com"
    },
    license: {
      name: "MIT",
      url: "https://github.com/DiegoMGar/prueba_bittome/blob/master/LICENSE"
    }
  },
  host: "ec2-15-236-212-50.eu-west-3.compute.amazonaws.com",
  basePath: "/",
  schemes: [
    "http"
  ],
  paths: {
    "/api/historical/{symbol}": {
      get: {
        summary: "Obten los últimos 100 movimientos de una moneda",
        operationId: "ReadHistoricalSymbol",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            "name": "symbol",
            "in": "path",
            "description": "El símbolo de la moneda que quieres consultar",
            "required": true,
            "type": "string"
          }
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: {
              "$ref": "#/definitions/Historical"
            }
          },
          400: {
            description: "El parámetro symbol es obligatorio"
          },
          500: {
            description: "Error fatal"
          }
        }
      }
    }
  },
  definitions: {
    Historical: {
      type: "object",
      properties: {
        data: {
          description: "",
          type: "object",
          properties: {
            symbol: {
              description: "Indica qué moneda estás consultando",
              type: "string",
            },
            price: {
              description: "El precio de la moneda en este instante",
              type: "number",
            },
            last_update: {
              description: "Indica en qué instante se ha obtenido este precio",
              type: "string",
              format: "ISO string",
            },
            market_cap: {
              description: "Indica el total del valor alcanzado",
              type: "number",
            }
          },
        },
        resolver: {
          description: "Indica qué capa de datos ha resuelto la consulta",
          type: "string",
          format: "(mongo|redis)"
        }
      }
    }
  }
}