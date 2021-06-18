# GraphQL Template

Template repository for GraphQL services using [Apollo][apollo].

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment variables](#environment-variables)
- [Codegen](#codegen)
- [Testing](#testing)
- [Infrastructure](#infrastructure)
- [CI/CD](#cicd)

## Requirements

-   [docker](https://docs.docker.com/install/)
-   [docker-compose](https://docs.docker.com/compose/install/)
-   [nodejs](https://nodejs.org/en/)
-   [yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

-   Copy the **.env.example** file in the root of the project as **.env** and fill in any necessary [Environment Variables](#environment-variables)
-   Run `make`
-   App will be running at http://localhost:4000/graphql
-   Run `make stop` to destroy local environment

## Environment variables

| Key          | Description                            |   Default    | Required |
| ------------ | -------------------------------------- | :----------: | :------: |
| GRAPHQL_PATH | The pathname to serve GraphQL requests | `"/graphql"` |          |
| LOG_FORMAT   | The [morgan] log format                | `"combined"` |          |
| PORT         | The application port                   |    `4000`    |          |
| REDIS_HOST   | The Redis cache hostname               |              |    ✅    |
| REDIS_PORT   | The Redis cache port                   |    `6379`    |          |

## Codegen

Run `yarn generate` to generate TypeScript definitions for GraphQL resolvers with [GraphQL Code Generator][graphql-codegen].

In [Visual Studio Code][vscode], codegen can be run as a background task by executing **Tasks: Run Task** and selecting **npm: generate**.

## Testing

Run `yarn test` to run [Jest][jest] tests.

## Infrastructure

[Terraform](https://terraform.io) configurations are located in the **.iac** directory.

## CI/CD

Continuous integration and deployment workflows are run via [GitHub Actions][gh-actions]. See **.github/workflows** for workflow configurations.

### CI

-   Runs build and test on all branches

### Create release

-   Runs build, test, and deploy on version tags (v\*).
-   Deploys to **dev** on every **prerelease tag** (v1.2.4-pre.0, v2.0.0-rc.5)
-   Deploys to **dev**, **staging**, and **prod** on every **release tag** (v3.4.5)

[apollo]: https://www.apollographql.com/docs/apollo-server
[gh-actions]: https://github.com/features/actions
[graphql-codegen]: https://graphql-code-generator.com
[jest]: https://jestjs.io
[morgan]: https://www.npmjs.com/package/morgan#predefined-formats
[vscode]: https://code.visualstudio.com
