<h1 align="center">Node.js REST API | Car rental service controller and management application</h1>

The purpose of the project is to manage the process of rental, devolution and registration of cars, beeing able to check their availability, total costs and billings based on the given rental date and expected return date.

<br />
<h2>Dependencies</h2>

### Core Libraries

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Express](https://expressjs.com/pt-br/)
- [Tsyringe](https://www.npmjs.com/package/tsyringe?activeTab=readme)

### Utility Libraries

- [Day.js](https://day.js.org)
- [Handlebars](https://handlebarsjs.com/)
- [JWT](https://jwt.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Jest](https://jestjs.io/)
- [Typescript](https://www.typescriptlang.org/)

<br/>
<h2>Installation Instructions</h2>

Depending on your preferred package manager, follow the instructions below to deploy your project.

### Using NPM

- Run `npm i` to install the project dependencies

### Using Yarn

- Run `yarn` to install the project dependencies
  
<br />
<h2>Deployment Instructions</h2>

### Local Deploy

> **Requirement**: You need at least Dokcker version 20.10.0 installed in your machine to run the Dokcker Compose `version 3.9`.

> **Requirement**: Set the environment variables at the `.env` file considering the example file included within the project repository.

> **Requirement**: Set the typeorm variables at the `ormconfig.josn` file considering the example file included within the project repository. If you wanna keep the configuration created on the example file, just remove the `.example` extention.

- Run `docker-compose up -d` to create and run the required app containers.

- Run `yarn typeorm migration:run` or `npm run typeorm migration:run` to run the migrations and build the schemas in the local database included in the container.

- Run `yarn seed:admin` or `npm run seed:admin` to insert the admin user account inside the `users` table, so you can manage the resources that require administration permission on the API.

- Run `yarn dev` or `npm run dev` to start the application locally.

- Run `yarn test` or `npm run test` to execute unitary tests.

<br />
<h2>Endpoints Available</h2>

- Clone the requests structure repository into your insomnia app by accessing this [link](https://github.com/Bernardomennndes/rentx-insomnia).

- Access the route `http://localhost:3333/api-docs` for the full routes documentation made with swagger.

<br />
<h2>Project structure</h2>

The project code base is mainly located within the `src` folder. This folder is divided in:

- `@types` - containing custom types
- `config` - containing the function config files
- `modules` - containing the application modules
- `shared` - containing shared utility functions and configuration
- `utils` - containing utilities

```
.
├── src
│   ├── @types                           # Lambda configuration and source code folder.
│   │
│   ├── config                           # Functions configuration folder.
│   │
|   ├── modules                          # Folder containing the app modules
|   |   └── module
|   |       └── dtos                     # Data transfer objects
|   |       └── infra                    # Module infrastructure
|   |       └── mapper                   # Response mappers
|   |       └── repositories             # Repositories and entities
|   |       └── useCases                 # Use cases related to the module
|   |       └── view                     # File templates
|   |
|   ├── shared                           # Folder that contains shared files among the application.
|   |
|   ├── utils                            # Utility Folder
|   |
|   └── swagger.json                     # Swagger routes and documentation structure
|
├── package.json
├── babel.config.js                      # Babel compiler configuration for build
├── docker-compose.yaml                  # Docker compose file for container build
├── Dockerfile                           # Docker file for running containers
├── ormconfig.json                       # Typeorm database config
└── tsconfig.json                        # Typescript compiler configuration
```
