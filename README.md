# MiniBlog API

API REST para gestionar autores, publicaciones y comentarios de blog. Proyecto desarrollado con Node.js, Express y PostgreSQL.

## 🚀 Tecnologías

- **Node.js** v24.14.0
- **Express** v5.2.1
- **PostgreSQL** 15.17
- **Vitest** para testing
- **Supertest** para tests de integración

## 📋 Prerrequisitos

- Node.js instalado
- PostgreSQL instalado y corriendo
- npm o yarn

## 🔧 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/Angie897/ProyectoM2_AngelicaGarciaMendoza.git
cd miniblog-api
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL=postgresql://tu_usuario@localhost:5432/miniblog
PORT=3000
NODE_ENV=development
```

### 4. Configurar la base de datos
```bash
# Conectarse a PostgreSQL
psql postgres

# Crear la base de datos
CREATE DATABASE miniblog;

# Conectarse a la base de datos
\c miniblog

# Ejecutar el script de setup
\i sql/setup.sql

# Insertar datos de prueba
\i sql/seed.sql

# Crear tabla de comentarios
\i sql/comments.sql

# Salir
\q
```

### 5. Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## 🧪 Ejecutar Tests
```bash
npm test
```

## 📚 Endpoints

### Authors

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/authors` | Listar todos los autores |
| GET | `/authors/:id` | Obtener un autor por ID |
| POST | `/authors` | Crear un nuevo autor |
| PUT | `/authors/:id` | Actualizar un autor |
| DELETE | `/authors/:id` | Eliminar un autor |

### Posts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/posts` | Listar todos los posts |
| GET | `/posts/:id` | Obtener un post por ID |
| GET | `/posts/author/:authorId` | Posts de un autor específico con JOIN |
| POST | `/posts` | Crear un nuevo post |
| PUT | `/posts/:id` | Actualizar un post |
| DELETE | `/posts/:id` | Eliminar un post |

### Comments

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/comments` | Listar todos los comentarios con autor y post |
| GET | `/comments/:id` | Obtener un comentario por ID |
| GET | `/comments/post/:postId` | Comentarios de un post específico |
| GET | `/comments/author/:authorId` | Comentarios de un autor específico |
| POST | `/comments` | Crear un nuevo comentario |
| PUT | `/comments/:id` | Actualizar un comentario |
| DELETE | `/comments/:id` | Eliminar un comentario |

## 📝 Ejemplos de Uso

### Crear un autor
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "bio": "Developer and writer"
  }'
```

### Crear un post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my post",
    "author_id": 1,
    "published": true
  }'
```

### Crear un comentario
```bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "post_id": 1,
    "author_id": 2,
    "content": "Excelente post, muy útil!"
  }'
```

### Obtener comentarios de un post
```bash
curl http://localhost:3000/comments/post/1
```

## 🗄️ Estructura de la Base de Datos

### Tabla: authors
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR(100) NOT NULL)
- email (VARCHAR(100) UNIQUE NOT NULL)
- bio (TEXT)
- created_at (TIMESTAMP DEFAULT NOW())
```

### Tabla: posts
```sql
- id (SERIAL PRIMARY KEY)
- author_id (INTEGER NOT NULL, FK -> authors.id ON DELETE CASCADE)
- title (VARCHAR(200) NOT NULL)
- content (TEXT NOT NULL)
- published (BOOLEAN DEFAULT false)
- created_at (TIMESTAMP DEFAULT NOW())
```

### Tabla: comments
```sql
- id (SERIAL PRIMARY KEY)
- post_id (INTEGER NOT NULL, FK -> posts.id ON DELETE CASCADE)
- author_id (INTEGER NOT NULL, FK -> authors.id ON DELETE CASCADE)
- content (TEXT NOT NULL)
- created_at (TIMESTAMP DEFAULT NOW())
```

## 🚢 Deployment en Railway

### 1. Crear cuenta en Railway

Ve a [railway.app](https://railway.app) y crea una cuenta.

### 2. Crear proyecto

- New Project → Deploy from GitHub repo
- Selecciona tu repositorio: `ProyectoM2_AngelicaGarciaMendoza`

### 3. Agregar PostgreSQL

- Add Service → Database → PostgreSQL
- Railway creará automáticamente la base de datos

### 4. Configurar variables de entorno

En tu servicio de Node.js, agrega estas variables:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
NODE_ENV=production
```

Railway conectará automáticamente la variable `DATABASE_URL` del servicio PostgreSQL a tu aplicación.

### 5. Ejecutar migrations

Conectarse a la base de datos de Railway usando la URL pública del servicio Postgres:
```bash
psql <URL_PUBLICA_POSTGRES>
```

Luego ejecutar los scripts:
```sql
\i sql/setup.sql
\i sql/seed.sql
\i sql/comments.sql
\q
```

### 6. Deploy

Railway hace deploy automáticamente cuando haces push a tu rama principal.

**URL pública:** `https://proyectom2angelicagarciamendoza-production.up.railway.app`

## 📖 Documentación de la API

La documentación completa de la API está disponible en el archivo `openapi.yaml`.

Puedes visualizarla usando:
- [Swagger Editor](https://editor.swagger.io/)
- [Redoc](https://redocly.github.io/redoc/)

## 🤖 Uso de AI en el Proyecto

Este proyecto fue desarrollado con asistencia de Claude AI (Anthropic) para:

- Diseño de la arquitectura del proyecto
- Implementación de endpoints RESTful
- Configuración de PostgreSQL y queries SQL
- Escritura de tests unitarios con Vitest
- Configuración de ES Modules
- Debugging y resolución de errores
- Documentación del código y README
- Implementación de la entidad Comments (créditos extra)

### Prompts utilizados:

- "Explica la diferencia entre ES Modules y CommonJS"
- "¿Por qué debo agregar .js en las importaciones de ES Modules?"
- "¿Por qué usar `import pkg from 'pg'` en lugar de `import { Pool } from 'pg'`?"
- "Ayúdame a estructurar un proyecto Express con arquitectura en capas"
- "¿Qué son los middlewares y por qué la carpeta está vacía?"
- "Explica qué son los Comments y para qué sirven en un blog"

## 👥 Autor

**Angelica García Mendoza**
- GitHub: [@Angie897](https://github.com/Angie897)
- Proyecto: MiniBlog API
- Escuela: DevSpark
- Repositorio: [ProyectoM2_AngelicaGarciaMendoza](https://github.com/Angie897/ProyectoM2_AngelicaGarciaMendoza)

## 📄 Licencia

ISC