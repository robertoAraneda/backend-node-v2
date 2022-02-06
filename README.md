# backend-node-v2

Este es un projecto base para desarrollar aplicaciones backend en lenguaje Javascript (NodeJS), utilizando las tecnologías de Express, Prisma, y Typescript.

## Inicializar proyecto

```bash
$ yarn init
```

## Instalación de GIT

```bash
$ git init -b master
$ git add -A
$ git commit -m "commit"
$ git remote add origin https://github.com/robertoAraneda/backend-node-v2.git
$ git push -u origin main
```

### Crear un nuevo repositorio

```bash
$ echo "# prueba-git" >> README.md
$ git init
$ git add README.md
$ git commit -m "first commit"
$ git branch -M master
$ git remote add origin https://github.com/robertoAraneda/prueba-git.git
$ git push -u origin master
```
### Subir un repositorio ya creado

```bash
$ git remote add origin https://github.com/robertoAraneda/prueba-git.git
$ git branch -M master
$ git push -u origin master
```

## Instalar Typescript

```bash
$ yarn add -D typescript
```
Una vez instalado, creamos el archivo de configuración `tsconfig.json` utilizando el comando:

```bash
$ tsc --init
```
Es importante que el archivo debe ser creado en la raíz del projecto (al mismo nivel del `package.json`)
Habilitamos algunos parametros del archivo.

```json
{
  "compilerOptions": {
    "target": "es2017",                           /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                         /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "sourceMap": true,                            /* Generates corresponding '.map' file. */
    "outDir": "./dist",                           /* Redirect output structure to the directory. */
    "removeComments": true,                       /* Do not emit comments to output. */
    "strict": true,                               /* Enable all strict type-checking options. */
    "noImplicitAny": false,                       /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": false,                    /* Enable strict null checks. */
    "baseUrl": "./",                              /* Base directory to resolve non-absolute module names. */
    "allowSyntheticDefaultImports": true,         /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                      /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "skipLibCheck": true,                         /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true      /* Disallow inconsistently-cased references to the same file. */
  }
}
```

El proyecto esta desarrollado de forma modular, separando la lógica en `controllers`, `routes`, `dtos`, `http`, `middlewares`, `routes`, `server`, `services` y `tests`.
Se cran las carpetas bajo la carpeta root `src`.

## Instalar express

```bash
$ yarn add express
$ yarn add -D @types/node @types/express
```

Para ejecutar archivos `.ts` en tiempo de desarrollo, debemos instalar en el projecto los siguientes paquetes:

```bash
$ yarn add -D ts-node tsconfig-paths
```
Con lo anterior podemos crear un comando de execución para nodemon `ts-node -r tsconfig-paths/register --transpile-only src/index.ts`, con el que estaremos reiniciando nuestro servidor cada vez que hagamos cambios en nuestro código gracias a Nodemon.

## Nodemon

### Crear archivo de configuración

```bash
$ touch nodemon.json
```

Luego se agrega el objeto de configuración en el archivo `nodemon.json`
```json
{
  "watch": ["src", "__tests__"],
  "ext": "js,ts,json",
  "ignore": [".git", "node_modules/"],
  "exec": "ts-node -r tsconfig-paths/register --transpile-only src/index.ts"
}
```
## Instalación de ORM Prisma

```bash
$ yarn add @prisma/client
$ yarn add -D prisma
```
Luego inicializamos el módulo de prisma

```bash
$ yarn prisma init  
```

Modificamos el archivo `.env` y agregamos los datos de conexión a nuestra base de datos PostgreSQL.

```text
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/dev?schema=public"
```

Agregamos la entidad User para efectos de prueba de conexión en el archivo `prisma/schema.prisma`.

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  password String?
}
```
Generamos el archivo de migración de prisma para mapear los datos de prima con la DB.

```bash
$ yarn prisma migrate dev --name init
```

Obtendrás una salida en la terminal como esta:

```bash
$ /Users/robertoaraneda/Projects/Study/node-ts-v2/node_modules/.bin/prisma migrate dev --name init
Environment variables loaded from .env.production
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "dev", schema "public" at "localhost:5433"

PostgreSQL database dev created at localhost:5433

Applying migration `20220206141834_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20220206141834_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (3.9.1 | library) to ./node_modules/@prisma/client in 111ms


✨  Done in 6.56s.
```
Para generar una instancia del cliente prisma para toda nuestra aplicación, creamos un archivo `src/client.ts`

Para efectos de prueba agregamos el siguiente código en el archivo `client.ts` recién creado.

```typescript
async function main() {
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
            password: 'password'
        },
    })

    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
```

Para visualizar la DB en linea usamos el comando de prisma:

```bash
$ yarn prisma studio
```

## Script

Para gestionar distintos ambiendes de desarrollo, instalaremos el paquete:

```bash
$ yarn add -D cross-env
```

Para ejecutar fácilmente nuestro servidor de desarrollo, agregamos un script en nuestro archivo `package.json`

```text
 "dev": "cross-env NODE_ENV=development nodemon",
```
### Iniciar nuestro server de desarrollo

```bash
$ yarn dev
```

## Consultas HTTP para probar APIs

Para realizar consultas HTTP, creamos una carpeta `http`. Luego creamos un archivo de pruebas `http/user.http`.

Creamos una consulta a nuestra API como sigue:

```http request
GET http://localhost:3000/users
Accept: application/json
```
Obtendremos una salida como esta:

```http request
GET http://localhost:3000/users

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 102
ETag: W/"66-tgnlmHaJOyi8rMXLSar1UXjeOFc"
Date: Sun, 06 Feb 2022 14:43:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": [
    {
      "id": 1,
      "email": "alice@prisma.io",
      "name": "Alice",
      "password": "password"
    }
  ],
  "message": "findAll"
}

Response code: 200 (OK); Time: 242ms; Content length: 102 bytes
```

## ESlint
Instalaremos la librería de ESlint para potenciar el desarrollo y mejorar la sintaxis y manejo de errores durante el desarrollo.

```bash
$ yarn add -D eslint 
$ yarn add -D @typescript-eslint/parser 
$ yarn add -D @typescript-eslint/eslint-plugin
```
Luego inicializamos eslint y seguimos las instrucciones.

```bash
$ yarn eslint --init
```
Creamos un archivo `.eslintignore` y agregamos las siguientes lineas para evitar que eslint revise estos archivos.

```text
/dist
/node_modules
.*
jest.config.js
```

Agregamos las siguientes reglas al archivo `.eslintrc.js`. Debería quedar como sigue:

```js
module.exports = {
    "rules": {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        '@typescript-eslint/no-unused-vars': 'error',
        // to enforce using type for object type definitions, can be type or interface
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    }
}
```

Agregamos un escript en el archivo `package.json`

```text
"lint": "eslint --ignore-path .eslintignore --ext .js,.ts ."
```

Si queremos correr el comando y que ESlint nos corrija los archivos en los cuales encontró error, ejecutamos el siguiente comando:
```bash
$ yarn lint -- --fix
```

## Prettier
Esta librería permite que el estilo de codificación se mantenga siempre igual, automátizando muchos procesos.

```bash
$ yarn add -D prettier
```

Luego creamos un archivo `.prettierrc` y agregamos lo siguiente:

```json
{
  "printWidth": 150,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "arrowParens": "always",
  "bracketSpacing": true
}
```

Creamos un archivo `.prettierignore` y agregamos lo siguiente:

```text
.idea
.eslintrc.js
tsconfig.json
```

Finalmente agregamos un script en el archivo `package.json`, para formatear el código.

```text
"format": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\""
```

Para evitar conflictos de formateo de código entre ESLint y Prettier, instalamos el siguiente plugin:

```bash
$ yarn add -D eslint-config-prettier   
```

Agregamos en el archivo `.eslintrc.js` la siguiente línea:

```text
extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', "prettier"],
```

## Testing

### Test unitarios

Para crear los test de este projecto usaremos la librería  `Jest`

```bash
$ yarn add -D jest 
$ yarn add -D ts-jest 
$ yarn add -D @types/jest     
```
Luego creamos el archivo de configuración de jest

```bash
$ yarn jest --init
```

El archivo de configuración quedaría como sigue:

```js
module.exports = {
  verbose: true,
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/singleton.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/index.ts', '<rootDir>/src/client.ts', '<rootDir>/src/server/server.ts', '<rootDir>/src/__tests__'],
  setupFiles: ['dotenv/config'],
};

```

Para realizar un mock de la libreria Prisma, instalamos el siguiente paquete:

```bash
$ yarn add -D jest-mock-extended
```
Luego creamos un archivo llamado `singleton.ts`, el cual servirá para crar nuestro prisma mock en base al archivo de `client.ts`. Este archivo se utiliza en el archivo de configuración de `Jest`, para luego utilizarlo en los test.

Para crear los los test, debemos crear una carpeta llamada `__test__`, en el directorio donde estan los archivos para test.

En el siguiente ejemplo, creamos un archivo `services/__test__/user.service.spec.ts`

Este archivo contiene el siguiente código:

```typescript
import { prismaMock } from '../../singleton';
import UserService from '../user.service';

const userService: UserService = new UserService();

test('should get a list of users', async () => {
  const users = [
    {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'true',
    },
  ];

  prismaMock.user.findMany.mockResolvedValue(users);

  await expect(userService.findAllUser()).resolves.toEqual([
    {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      password: 'true',
    },
  ]);
});
```
En este test, utilizamos el objeto de prisma mock, para injectar una respuesta de la librería, como es el arreglo de users.
Cuando llamamos el método findAllUser de la clase UserService, este devuelve el array mock.

### Test de integración (end-to-end)
Para realizar estos test, crearemos una base de datos utilziando docker.

Creamos un archivo `docker-compose.yml`

```yaml
# Set the version of docker compose to use
version: '3.9'

# The containers that compose the project
services:
  db:
    image: postgres:13
    restart: always
    container_name: integration-__tests__-prisma
    ports:
      - '5433:5432'
    environment:
      POSTGRES_USER: prisma
      POSTGRES_PASSWORD: prisma
      POSTGRES_DB: __tests__
```
Creamos un archivo `.env.test` para agregar el string de conexión a la DB.

```text
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/tests"
```

Luego ejecutamos el comando

```bash
$ docker-compose up -d
```
Una vez creado nuestro contenedor, revisamos que la base de datos denominada `tests` ha sido creada.
```bash
$ docker ps
```
```bash
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                    NAMES
8d3120676053   postgres:13   "docker-entrypoint.s…"   24 seconds ago   Up 22 seconds   0.0.0.0:5433->5432/tcp   integration-__tests__-prisma
```
Ingresamos al contenedor, utilizando el ID del contenedor.

```bash
$ docker exec -it 8d3120676053 psql -U prisma __tests__
```
```bash
psql (13.4 (Debian 13.4-4.pgdg110+1))
Type "help" for help.

__tests__=# \l
                              List of databases
   Name    | Owner  | Encoding |  Collate   |   Ctype    | Access privileges 
-----------+--------+----------+------------+------------+-------------------
 postgres  | prisma | UTF8     | en_US.utf8 | en_US.utf8 | 
 template0 | prisma | UTF8     | en_US.utf8 | en_US.utf8 | =c/prisma        +
           |        |          |            |            | prisma=CTc/prisma
 template1 | prisma | UTF8     | en_US.utf8 | en_US.utf8 | =c/prisma        +
           |        |          |            |            | prisma=CTc/prisma
 __tests__     | prisma | UTF8     | en_US.utf8 | en_US.utf8 | 
(4 rows)
```

El flujo de operaciones para ejecutar los test de integración es el siguente:

**Flujo de operaciones**

1. Iniciar el contenedor y crear la base de datos
2. Migrar el esquema de DB
3. Correr los test
4. Eliminar el contenedor

## Producción

Para compilar nuestro proyecto a producción, creamos el siguiente script en nuestro archivo `package.json`
Previamente debemos instalar el paquete:

```bash
$ yarn add -D rimraf
```
Este paquete nos gestiona la eliminación de la carpeta `dist` de forma segura cada vez que necesitemos compilar nuestro proyecto.

```bash
$ yarn add dotenv
$ yarn add dotenv-cli
```
Estos paquetes nos permiten manejar distintas variables de entorno.

```text
   "build": "rimraf dist && tsc",
   "prod": "npm run build && dotenv -e .env -- npx prisma migrate prod --name postgres-init && cross-env NODE_ENV=production node dist/index.js",
```
Por defecto, `prisma` usa el archivo `.env` para buscar variables de entorno. Debemos crear este archivo en producción.

## Developer dependencies

```bash
$ yarn add -D typescript nodemon prettier
```


## Dependencies

```bash
$ yarn add express
```
