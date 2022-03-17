## Building

### Gradle

```shell
./scripts/build.cmd
```

### Docker

After having built the .jar using the previous build command:

```shell
./scripts/docker/build.cmd
```

## Testing

This doesn't exist, but it should, shouldn't it?

```shell
./scripts/test.sh
```

## Running Locally

### Gradle

To simply start the Spring webserver from Gradle, use

```shell
./scripts/run.sh
```

### Docker

To run a local development copy use

```shell
./scripts/docker/run.sh
```

To pull the latest Docker image and attach to an existing database of cards and players, use

```shell
./scripts/start_adventure_server.sh
```

## Deploying

Push an image to docker using this all-in-one command:

```shell
./scripts/docker/deploy.sh
```

## Swagger

http://<root>/swagger-ui (e.g.: http://localhost:8080/swagger-ui/
or http://alcheim.online/swagger-ui/)