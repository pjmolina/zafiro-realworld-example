# inversify-realworld-example

Exemplary real world app built with TypeScript and InversifyJS

```sh
git clone https://github.com/remojansen/inversify-realworld-example.git
```

```sh
cd inversify-realworld-example
```

```sh
npm install
```

```sh
docker pull postgres
```

```sh
export POSTGRES_USER=postgres \
export POSTGRES_PASSWORD=secret \
export POSTGRES_HOST=localhost \
export POSTGRES_DB=demo
```

```hs
docker run --name POSTGRES_USER -p 5432:5432 -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" -e POSTGRES_USER="$POSTGRES_USER" -e POSTGRES_DB="$POSTGRES_DB" -d postgres
```