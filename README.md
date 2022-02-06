# backend-node-v2

Este es un projecto base para desarrollar aplicaciones backend en lenguaje Javascript (NodeJS), utilizando las tecnologías de Express, Prisma, y Typescript.

## Inicializar proyecto

```bash
yarn init
```

## Instalación de GIT

```bash
git init -b master
git add -A
git commit -m "commit"
git remote add origin https://github.com/robertoAraneda/backend-node-v2.git
git push -u origin main
```

### Crear un nuevo repositorio

```bash
echo "# prueba-git" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/robertoAraneda/prueba-git.git
git push -u origin master
```
### Subir un repositorio ya creado

```bash
git remote add origin https://github.com/robertoAraneda/prueba-git.git
git branch -M master
git push -u origin master
```

## Instalar Typescript

```bash
yarn add -D typescript
```
Una vez instalado, creamos el archivo de configuración `tsconfig.json` utilizando el comando:

```bash
tsc --init
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
Ya estamos listos para crar nuestro archivo `index.ts`

```bash
touch index.ts
```
Para ejecutar archivos `.ts` en tiempo de desarrollo, debemos instalar en el projecto los siguientes paquetes:

```bash
yarn add -D ts-node tsconfig-paths
```
Con lo anterior podemos crear un comando de execución para nodemon `ts-node -r tsconfig-paths/register --transpile-only src/index.ts`, con el que estaremos reiniciando nuestro servidor cada vez que hagamos cambios en nuestro código gracias a Nodemon.

## Nodemon

### Crear archivo de configuración

```bash
touch nodemon.json
```

Luego se agrega el objeto de configuración en el archivo `nodemon.json`
```json
{
  "watch": ["src", "tests"],
  "ext": "js,ts,json",
  "ignore": [".git", "node_modules/"],
  "exec": "ts-node -r tsconfig-paths/register --transpile-only src/index.ts"
}
```

## Add Developer dependencies

```bash
yarn add -D typescript nodemon prettier
```


## Add dependencies

```bash
yarn add express
```
