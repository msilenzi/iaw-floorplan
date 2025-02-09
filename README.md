# Instalación

## 1. Configurar el servidor

### 1.1 Configurar Auth0

1. [Crear una nueva API](./.assets/Auth0%20setup/1.%20Create%20API.png)
2. [Crear una nueva aplicación tipo SPA](./.assets/Auth0%20setup/2.%20Create%20App.png)
3. Configurar las rutas de la aplicación (_Application URIs_):
   - **Allowed Callback URLs:** `http://localhost:5173, http://localhost:3000/docs/oauth2-redirect.html`
   - **Allowed Logout URLs** `http://localhost:5173, http://localhost:3000/docs`
   - **Allowed Web Origins** `http://localhost:5173, http://localhost:3000/docs`

Imágenes con la configuración completa para [App](./.assets/Auth0%20setup/Todo%20APP%20settings.png) y [API (_no se modifica_)](./.assets/Auth0%20setup/Todo%20API%20settings.png)

### 1.2 Configurar AWS S3

1. Crear un bucket de AWS S3 (dejar las configuraciones por defecto)
2. Crear un IAM user y darle permisos "AmazonS3FullAccess"
3. Crear un access key para el nuevo usuario

### 1.2 Configurar archivo `.env`

Crear el archivo `server/.env` y completar con los siguientes campos:

Auth0:

- `AUTH0_ISSUER_URL` tiene la forma `https://<AUTH0-TENANT-NAME>.us.auth0.com/` donde `<AUTH0-TENANT-NAME>` es el identificador del tenant donde está la API ([se puede ver en la esquina superior izquierda](./.assets/Auth0%20setup/Tenant%20Name.png))
- `AUTH0_AUDIENCE` es el identificador (_identifier_) de la API de Auth0 (se puede ver desde los _settings_ de la API)
- `AUTH0_CLIENT_ID` es el identificador de la aplicación (se puede ver desde los _settings_ de la app)
- `AUTH0_MANAGEMENT_TOKEN` se puede obtener desde APIs/Auth0 Management API/Api Explorer

AWS S3:

- `S3_REGION` región en la que creo el bucket de AWS S3. Por ejemplo: _sa-east-1_.
- `S3_ACCESS_KEY` clave de acceso del usuario IAM creado para acceder a S3.
- `S3_SECRET_KEY` clave secreta asociada a la clave de acceso (S3_ACCESS_KEY). Se proporciona una sola vez al momento de la creación.
- `S3_BUCKET` nombre del bucket de S3 donde se almacenarán los archivos.

MongoDB:

- `MONGODB_URI`: si se usa la imagen del repo usar `mongodb://root:root@localhost:27017/`. Si se usa MongoDB Atlas copiar la URI.

### 1.3 Instalar las dependencias necesarias

```bash
npm i
```

### 1.4. Levantar la base de datos MongoDB con Docker Compose:

```bash
docker compose up -d
```

### 1.5. Iniciar el servidor en modo de desarrollo:

```bash
npm run start:dev  # o npm run start:dev:no-hmr
```

En [http://localhost:3000/docs](http://localhost:3000/docs) está la documentación de Swagger.
En [http://localhost:3000/docs-json](http://localhost:3000/docs-json) está la especificación OpenAPI en formato JSON.

## 2. Configurar el cliente

### 2.1 Configurar el archivo `.env`

Crear el archivo `client/.env` y completar con los siguientes campos:

- `VITE_AUTH0_DOMAIN` tiene la forma `<AUTH0-TENANT-NAME>.us.auth0.com`
- `VITE_AUTH0_CLIENT_ID` mismo valor que `AUTH0_CLIENT_ID`
- `VITE_AUTH0_AUDIENCE` mismo valor que `AUTH0_AUDIENCE`
- `VITE_API_BASE_URL` URL base del backend.

### 2.2 Instalar las dependencias necesarias

```bash
npm i
```

### 2.3 Generar los endpoints en el cliente a partir de la especificación de Open API

```bash
npm run api:generate
```

**IMPORTANTE:** para que este comando funcione el servidor debe estar ejecutándose.

### 2.4 Iniciar el servidor del cliente en modo de desarrollo

```bash
npm run dev
```
