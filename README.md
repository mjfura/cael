# Cael Arch

Cael - Arch is a ligthweight library for manage and start to create a project using a clean architechture. This library is inspired by the clean architecture and the SOLID principles. The main goal of this library is to provide a simple way to create a project using a clean architecture and SOLID principles. For this, it is necessary to create a configuration file that will be used to create the project structure. This configuration file is a JSON file named cael.config.json that will be used to create the project structure.

## Installation

```bash
npm install cael-arch
```

```bash
pnpm install cael-arch
```

```bash
yarn install cael-arch
```

## Usage

To use this library, you need to create a configuration file named cael.config.json. This file will be used to create the project structure. The configuration file has the following structure:

```json
{
  "path": "src", // the path where you want to create the modules folder
  "entities": [
    {
      "name": "users",
      "defaultRepository": "mysql", // this will be the first repository for this entity in the infrastructure layer
      "attributes": [
        {
          "name": "id",
          "type": "number"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "password",
          "type": "string"
        }
      ],
      "methods": [
        {
          "name": "createUser", // use camelCase for the method name
          "parameters": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "email",
              "type": "string"
            },
            {
              "name": "password",
              "type": "string"
            }
          ],
          "is_promise": true,
          "return_type": "number"
        },
        {
          "name": "getUser",
          "parameters": [
            {
              "name": "id",
              "type": "number"
            }
          ],
          "is_promise": true,
          "return_type": "__entity__" // this will be replaced by the entity name
        }
      ]
    }
  ]
}
```

After creating the configuration file, you can use the following command to create the project structure:


```bash
npm run cael
```
Also, remember to add the following script in your package.json file:

```json
{
  "scripts": {
    "cael": "cael"
  }
}
```

By the moment this library is in development, so it is not recommended to use it in production. If you want to contribute to this project, you can fork this repository and create a pull request with your changes.