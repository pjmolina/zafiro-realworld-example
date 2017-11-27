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
npm install -g ts-node typescript
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
docker run --name POSTGRES_USER -p 5432:5432  \
-e POSTGRES_PASSWORD="$POSTGRES_PASSWORD"  \
-e POSTGRES_USER="$POSTGRES_USER"  \
-e POSTGRES_DB="$POSTGRES_DB" \
-d postgres
```

```sh
ts-node ./src/server.ts
```

## TODO

```
Reading: /Users/remojansen/CODE/inversify-realworld-example/src/entities
Success!
Loading: /Users/remojansen/CODE/inversify-realworld-example/src/entities/role.ts
Success!
Loading: /Users/remojansen/CODE/inversify-realworld-example/src/entities/tweet.ts
Success!
Loading: /Users/remojansen/CODE/inversify-realworld-example/src/entities/user.ts
Success!
Loading: /Users/remojansen/CODE/inversify-realworld-example/src/entities/user_role.ts
Success!
Creating repository with TYPE Symbol(Repository<Role>)
Reading: /Users/remojansen/CODE/inversify-realworld-example/src/entities
Creating repository with TYPE Symbol(Repository<Tweet>)
Reading: /Users/remojansen/CODE/inversify-realworld-example/src/entities
Creating repository with TYPE Symbol(Repository<User>)
Reading: /Users/remojansen/CODE/inversify-realworld-example/src/entities
Creating repository with TYPE Symbol(Repository<UserRole>)
Reading: /Users/remojansen/CODE/inversify-realworld-example/src/entities
Reading: /Users/remojansen/CODE/inversify-realworld-example/src/controllers
Success!
{"level":30,"time":1511754610104,"msg":"Trying to connect to DB: postgres://postgres:secret@localhost:5432/demo","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
Success!
{"level":30,"time":1511754610160,"msg":"Trying to connect to DB: postgres://postgres:secret@localhost:5432/demo","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
Success!
{"level":30,"time":1511754610163,"msg":"Trying to connect to DB: postgres://postgres:secret@localhost:5432/demo","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
Success!
{"level":30,"time":1511754610164,"msg":"Trying to connect to DB: postgres://postgres:secret@localhost:5432/demo","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
Success!
Loading: /Users/remojansen/CODE/inversify-realworld-example/src/controllers/tweet_controller.ts
Success!
Loading: /Users/remojansen/CODE/inversify-realworld-example/src/controllers/user_controller.ts
Success!
(node:75192) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: No matching bindings found for serviceIdentifier: Symbol(Repository<User>)
(node:75192) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
(node:75192) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): RepositoryNotFoundError: No repository for "[object Object]" was found. Looks like this entity is not registered in current "default" connection?
{"level":50,"time":1511754610637,"msg":"Cannot connect to DB {\"name\":\"QueryFailedError\",\"length\":231,\"severity\":\"ERROR\",\"code\":\"23505\",\"detail\":\"Key (nspname)=(demo) already exists.\",\"schema\":\"pg_catalog\",\"table\":\"pg_namespace\",\"constraint\":\"pg_namespace_nspname_index\",\"file\":\"nbtinsert.c\",\"line\":\"434\",\"routine\":\"_bt_check_unique\",\"query\":\"CREATE SCHEMA IF NOT EXISTS \\\"demo\\\"\",\"parameters\":[]}","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
(node:75192) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): QueryFailedError: duplicate key value violates unique constraint "pg_namespace_nspname_index"
{"level":50,"time":1511754610651,"msg":"Cannot connect to DB {\"name\":\"QueryFailedError\",\"length\":231,\"severity\":\"ERROR\",\"code\":\"23505\",\"detail\":\"Key (nspname)=(demo) already exists.\",\"schema\":\"pg_catalog\",\"table\":\"pg_namespace\",\"constraint\":\"pg_namespace_nspname_index\",\"file\":\"nbtinsert.c\",\"line\":\"434\",\"routine\":\"_bt_check_unique\",\"query\":\"CREATE SCHEMA IF NOT EXISTS \\\"demo\\\"\",\"parameters\":[]}","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
(node:75192) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 4): QueryFailedError: duplicate key value violates unique constraint "pg_namespace_nspname_index"
{"level":50,"time":1511754610653,"msg":"Cannot connect to DB {\"name\":\"QueryFailedError\",\"length\":231,\"severity\":\"ERROR\",\"code\":\"23505\",\"detail\":\"Key (nspname)=(demo) already exists.\",\"schema\":\"pg_catalog\",\"table\":\"pg_namespace\",\"constraint\":\"pg_namespace_nspname_index\",\"file\":\"nbtinsert.c\",\"line\":\"434\",\"routine\":\"_bt_check_unique\",\"query\":\"CREATE SCHEMA IF NOT EXISTS \\\"demo\\\"\",\"parameters\":[]}","pid":75192,"hostname":"Remos-MacBook-Pro.local","v":1}
(node:75192) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 5): QueryFailedError: duplicate key value violates unique constraint "pg_namespace_nspname_index"
```