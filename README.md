<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# DEV ENVIRONMENT
1. Clone repository
2. Execute
```
yarn install
```
3. Nest CLI already installed
```
npm i -g @nestjs/cli
```
4. Run DB
```
docker compose up -d
```
5. Clone the file __.env.template__ and rename the copy to __.env__
6. Fill in the environment variables defined in the ```.env``` file
7. Run the application in development mode:
```
yarn start:dev
```

8. Run DB with data from seed
```
http://localhost:3000/api/seed
```


## Stack used
* MongoDB
* Nest