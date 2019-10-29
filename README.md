Typescript App Docker Demo
---

An example app to demonstrate some concepts and best practices:

* Running development in a Docker container with hot-reload.
* Example test approach.
* Use of official node Docker image.
* Docker multi-stage build.
* Use of linter and code coverage.
* Use of Makefile to build and run Docker image.

## Explanation of the core concepts

### Dev environment

It can be useful to run node services within their Docker containers when developing them:
* the code can be run in the same node version as it will use on production.
* if you have other services running within Docker, connecting them together becomes easier using Docker's service discovery.
* bringing a service up is consistent, whether you want to launch it in a production or dev mode.

### Test approach

The tests are strictly split between the setup and assertion of each test. This means that failing assertions are clear to understand, and new assertions can easily be added.

### Docker image

Using the official Docker image can be an easy way to run the application securely, and stay up to date with the latest platform features and security fixes.


### Multi-stage build

The docker build is carried out using a multi-stage build process. This effectively creates two container environments, where the first container is used as a temporary build environment, and the artefacts of that build are carried into the second container which will become the production artefact.

In a Typescript application, this is useful as it keeps the source code out of the distributed package. Only the built code and the production node_modules will be packaged. This also helps to reduce the size of the docker images.


### Linter and code coverage

The linter will ensure code-style consistency.

The code coverage can provide some clues as to areas of the code that may require additional test coverage.

### Makefile

Provides an example of how the container should be built and run.

The commands included here could perhaps remove the need for a proper CI tool in the early stages of a project. When CI is required, the commands can just be called by the CI tool, so the CI configuration does not require any special knowledge of how to build the project other than the name of the command.

## Misc

* `npm install` is run with the `--ignore-scripts` flag, which prevents dependencies and their sub-dependencies from running scripts. This removes the most serious attack vector with npm, however it may break dependencies that rely on install scripts to function. Remove this flag at your own peril.
