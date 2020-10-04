# camel_Case

## Team details

| Name              | Email                               | Student Number |
|:------------------|:------------------------------------|---------------:|
| Nathan Harvey     | nhharvey@student.unimelb.edu.au     | 997261         |
| Sean Gayler       | scianciogayl@student.unimelb.edu.au |                |
| Kevin Kim         | kwkim@student.unimelb.edu.au        | 997107         |
| Edward Hinrichsen | ewhinrichsen@student.unimelb.edu.au |                |
| Taylor Johnston   | johnstont@student.unimelb.edu.au    | 759667         |


## Getting Started

### Local Installation

These instructions will help you get a copy of the project up and running for development and testing. This project runs on an Express backend and React frontend with TypeScript. You will need `npm` and `yarn` installed to start.

### SSL certificate
Before building either servers, you will need an ssl certificate. In a terminal, or command prompt on windows, cd to the camelCase directory, and run `openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365`, entering appropriate values when prompted. You will then need to specify where these files are in each servers `.env` file. Add `SSL_CRT_FILE=../server.cert` and `SSL_KEY_FILE=../server.key` to the `.env` file in each subdirectory (api and client).

#### API Server: Express

First start by installing and running the Express backend in the `api` directory.

In the root directory, start by installing the dependent node modules:

```
cd api
npm install
```

To start the server, run:

```
npm start
```

Alternatively, you can run the server with hot loading with `nodemon`

```
nodemon
```

#### Client: React

First start by installing and running the React frontend in the `client` directory.

```
cd client
yarn install
```

In the `client` directory, you can start the React app by running:

```
yarn start
```

Once you are done, the app should automatically launch, however, the app can be found at:

```
localhost:3000
```

## Component Documentation

The frontend React components are documented using [Storybook](https://storybook.js.org)

To start Storybook, in the `client` folder, run:

```
yarn storybook
```

In should open automatically, however the app can be found at:

```
localhost:6006
```

