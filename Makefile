NODE_BASE_IMAGE := node:12.9.0-alpine
NODE_BASE_INSTALL_DIR := /home/node/app
IMAGE_NAME := nodeappsampletsc

build:
	docker build -t ${IMAGE_NAME} .

test-and-build: npm-lint npm-test npm-audit build

run-prod:
	docker run --rm --init -p 8080:8080 -e NODE_ENV=production ${IMAGE_NAME}

run-dev:
	docker run --rm --init -p 8080:8080 -v $(shell pwd)/app:${NODE_BASE_INSTALL_DIR} -w ${NODE_BASE_INSTALL_DIR} ${NODE_BASE_IMAGE} npm run start-dev

npm-test:
	docker run --rm --init -v $(shell pwd)/app:${NODE_BASE_INSTALL_DIR} -w ${NODE_BASE_INSTALL_DIR} ${NODE_BASE_IMAGE} npm test

npm-lint:
	docker run --rm --init -v $(shell pwd)/app:${NODE_BASE_INSTALL_DIR} -w ${NODE_BASE_INSTALL_DIR} ${NODE_BASE_IMAGE} npm run prebuild

npm-audit:
	docker run --rm --init -v $(shell pwd)/app:${NODE_BASE_INSTALL_DIR} -w ${NODE_BASE_INSTALL_DIR} ${NODE_BASE_IMAGE} npm audit

