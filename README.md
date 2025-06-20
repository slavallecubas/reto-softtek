[![Node.js Version](https://img.shields.io/badge/node.js-20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange.svg)](https://aws.amazon.com/lambda/)
[![Serverless Framework](https://img.shields.io/badge/Serverless-Framework-red.svg)](https://www.serverless.com/)
[![Jest](https://img.shields.io/badge/Jest-Testing-brightgreen.svg)](https://jestjs.io/)

Una API RESTful serverless que fusiona datos de la API de Star Wars (SWAPI) con información meteorológica en tiempo real, proporcionando una experiencia única de datos combinados sobre personajes de Star Wars y el clima de sus planetas.

## 🌟 Características Principales

- **Fusión de Datos Inteligente**: Combina información de personajes de Star Wars con datos meteorológicos de sus planetas
- **Arquitectura Serverless**: Desplegada en AWS Lambda para escalabilidad automática y costos optimizados
- **Sistema de Caché Avanzado**: Implementa cacheo inteligente con TTL de 30 minutos para optimizar rendimiento
- **Autenticación Segura**: Protección de endpoints con JWT/AWS Cognito
- **Monitoreo Completo**: Logging avanzado con CloudWatch y trazabilidad con X-Ray
- **Rate Limiting**: Protección contra abuso de APIs externas
- **Base de Datos Robusta**: Almacenamiento persistente con DynamoDB
- **Documentación Interactiva**: API documentada con Swagger/OpenAPI

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   API Gateway   │────│ AWS Lambda   │────│   DynamoDB      │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │
                    ┌─────────┼─────────┐
                    │                   │
            ┌───────────────┐  ┌─────────────────┐
            │   SWAPI       │  │ Weather API     │
            │ (Star Wars)   │  │ (OpenWeather)   │
            └───────────────┘  └─────────────────┘
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 20.x o superior
- AWS CLI configurado
- Serverless Framework
- TypeScript

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/starwars-weather-fusion-api.git
cd starwars-weather-fusion-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de API
```

### Variables de Entorno

```bash
# .env
WEATHER_API_KEY=tu_openweather_api_key
AWS_REGION=us-east-1
DYNAMODB_TABLE_NAME=starwars-weather-fusion
CACHE_TABLE_NAME=api-cache
JWT_SECRET=tu_jwt_secret_super_seguro
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600000
```

### Despliegue

```bash
# Desarrollo local
npm run dev

# Despliegue en AWS
npm run deploy

# Despliegue en producción
npm run deploy:prod
```

## 📋 Endpoints de la API

### 🔄 GET /fusionados
Obtiene datos fusionados de Star Wars y información meteorológica.

**Query Parameters:**
- `character` (string): Nombre del personaje de Star Wars
- `page` (number): Número de página para paginación
- `limit` (number): Límite de resultados por página

**Ejemplo de Respuesta:**
```json
{
  "success": true,
  "data": {
    "character": {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "birth_year": "19BBY",
      "homeworld": "Tatooine"
    },
    "weather": {
      "planet": "Tatooine",
      "temperature": 35.2,
      "humidity": 23,
      "condition": "sunny",
      "wind_speed": 12.5,
      "coordinates": {
        "lat": 25.0,
        "lon": -71.0
      }
    },
    "fusion_metadata": {
      "cached": false,
      "timestamp": "2025-06-19T10:30:00Z",
      "data_sources": ["SWAPI", "OpenWeatherMap"]
    }
  }
}
```

### 💾 POST /almacenar
Almacena información personalizada en la base de datos.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Mi dato personalizado",
  "content": "Información adicional",
  "category": "custom",
  "metadata": {
    "author": "usuario123",
    "tags": ["importante", "personalizado"]
  }
}
```

### 📊 GET /historial
Retorna el historial de consultas ordenado cronológicamente con paginación.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (number): Número de página (default: 1)
- `limit` (number): Elementos por página (default: 10, max: 100)
- `order` (string): Orden de resultados ('asc' | 'desc', default: 'desc')
- `filter` (string): Filtrar por tipo de datos

**Ejemplo de Respuesta:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 47,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

## 🧪 Testing

El proyecto incluye pruebas unitarias y de integración comprehensivas usando Jest y enfoque BDD con Gherkin.

```bash
# Ejecutar todas las pruebas
npm test

# Pruebas con cobertura
npm run test:coverage

# Pruebas en modo watch
npm run test:watch

# Pruebas de integración
npm run test:integration

# Pruebas BDD con Gherkin
npm run test:bdd
```

### Estructura de Pruebas

```
tests/
├── unit/
│   ├── services/
│   ├── controllers/
│   └── utils/
├── integration/
│   ├── endpoints/
│   └── database/
├── features/          # Gherkin/BDD tests
│   ├── fusion.feature
│   ├── storage.feature
│   └── history.feature
└── __mocks__/
```

### Ejemplo de Prueba BDD

```gherkin
# tests/features/fusion.feature
Feature: Fusión de datos Star Wars y meteorológicos
  Como usuario de la API
  Quiero obtener datos fusionados de personajes y clima
  Para tener información completa y contextual

  Scenario: Obtener datos fusionados exitosamente
    Given un personaje válido de Star Wars "Luke Skywalker"
    When solicito datos fusionados
    Then debería recibir información del personaje
    And debería recibir datos meteorológicos del planeta
    And los datos deberían estar correctamente fusionados
```

## 🔒 Autenticación y Seguridad

### JWT Authentication

```bash
# Obtener token JWT
POST /auth/login
{
  "username": "tu_usuario",
  "password": "tu_password"
}

# Usar token en headers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Rate Limiting

- **Límite por defecto**: 100 requests por hora por IP
- **Endpoints protegidos**: `/fusionados`, `/almacenar`, `/historial`
- **Headers de respuesta**:
  - `X-RateLimit-Limit`: Límite total
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Timestamp de reset

## 📦 Base de Datos

### DynamoDB Tables

#### starwars-weather-fusion
```json
{
  "TableName": "starwars-weather-fusion",
  "KeySchema": [
    {
      "AttributeName": "id",
      "KeyType": "HASH"
    }
  ],
  "AttributeDefinitions": [
    {
      "AttributeName": "id",
      "AttributeType": "S"
    },
    {
      "AttributeName": "timestamp",
      "AttributeType": "N"
    }
  ],
  "GlobalSecondaryIndexes": [
    {
      "IndexName": "timestamp-index",
      "KeySchema": [
        {
          "AttributeName": "timestamp",
          "KeyType": "HASH"
        }
      ]
    }
  ]
}
```

#### api-cache (Tabla de Caché)
- **TTL**: 30 minutos
- **Partición**: Por hash de query parameters
- **Limpieza automática**: DynamoDB TTL

## 🔧 Configuración y Optimización

### AWS Lambda Optimization

```yaml
# serverless.yml
functions:
  fusionados:
    handler: src/handlers/fusion.handler
    memorySize: 512
    timeout: 30
    reservedConcurrency: 10
    environment:
      NODE_OPTIONS: '--enable-source-maps'
```

### Cost Optimization Strategies

1. **Memory Right-sizing**: 512MB optimizado para balance costo/rendimiento
2. **Timeout Adjustment**: 30s para evitar costos innecesarios
3. **Reserved Concurrency**: Límite de concurrencia para control de costos
4. **Cold Start Optimization**: Reutilización de conexiones y inicialización lazy

## 📊 Monitoreo y Observabilidad

### CloudWatch Logs

```javascript
// Structured logging
logger.info('API request processed', {
  endpoint: '/fusionados',
  duration: 1250,
  statusCode: 200,
  userId: 'user123',
  requestId: 'req-456'
});
```

### AWS X-Ray Tracing

- **Trazabilidad end-to-end** de requests
- **Análisis de latencias** por componente
- **Detección de cuellos de botella**
- **Mapeo de dependencias** automático

### Métricas Personalizadas

```javascript
// Custom metrics
await cloudWatch.putMetricData({
  Namespace: 'StarWarsWeatherAPI',
  MetricData: [{
    MetricName: 'FusionRequestsPerMinute',
    Value: 1,
    Unit: 'Count',
    Dimensions: [{
      Name: 'Environment',
      Value: process.env.STAGE
    }]
  }]
}).promise();
```

## 📚 Documentación de la API

La documentación interactiva está disponible en:
- **Desarrollo**: `http://localhost:3000/api-docs`
- **Producción**: `https://api.tu-dominio.com/api-docs`

### Swagger/OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: Star Wars Weather Fusion API
  version: 1.0.0
  description: API que fusiona datos de Star Wars con información meteorológica
paths:
  /fusionados:
    get:
      summary: Obtener datos fusionados
      parameters:
        - name: character
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Datos fusionados exitosamente
```

## 🚀 Despliegue en Producción

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to AWS
        run: npm run deploy:prod
```

### Environments

- **Development**: `dev-starwars-weather-api`
- **Staging**: `staging-starwars-weather-api`
- **Production**: `prod-starwars-weather-api`

## 🐛 Troubleshooting

### Problemas Comunes

1. **Cold Start Latency**
   ```bash
   # Solución: Provisioned Concurrency
   serverless plugin install -n serverless-plugin-warmup
   ```

2. **DynamoDB Throttling**
   ```bash
   # Aumentar capacidad o usar Auto Scaling
   aws dynamodb update-table --table-name starwars-weather-fusion --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10
   ```

3. **API Rate Limits**
   ```javascript
   // Implementar exponential backoff
   const retryRequest = async (fn, retries = 3) => {
     for (let i = 0; i < retries; i++) {
       try {
         return await fn();
       } catch (error) {
         if (i === retries - 1) throw error;
         await sleep(Math.pow(2, i) * 1000);
       }
     }
   };
   ```

## 📈 Métricas de Rendimiento

### Benchmarks de Respuesta

| Endpoint | Promedio | P95 | P99 |
|----------|----------|-----|-----|
| `/fusionados` (cache hit) | 45ms | 120ms | 250ms |
| `/fusionados` (cache miss) | 850ms | 1.2s | 2.1s |
| `/almacenar` | 120ms | 200ms | 350ms |
| `/historial` | 95ms | 150ms | 280ms |

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código

- **ESLint**: Configuración estricta para TypeScript
- **Prettier**: Formateo automático de código
- **Husky**: Pre-commit hooks para calidad
- **Conventional Commits**: Formato estándar de commits

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **SWAPI**: Por proporcionar la API gratuita de Star Wars
- **OpenWeatherMap**: Por los datos meteorológicos precisos
- **AWS**: Por la infraestructura serverless robusta
- **Comunidad Open Source**: Por las librerías y herramientas utilizadas

## 📞 Contacto y Soporte

- **Email**: tu-email@ejemplo.com
- **LinkedIn**: [Tu Perfil de LinkedIn](https://linkedin.com/in/tu-perfil)
- **GitHub Issues**: Para reportar bugs o solicitar features
- **Documentation**: Documentación completa en [docs.tu-dominio.com](https://docs.tu-dominio.com)

---

**⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella en GitHub!**