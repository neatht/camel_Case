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
Before building either servers, you will need an ssl certificate. In a terminal, or command prompt on windows, cd to the camelCase directory, and run `openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365`.

You will be prompted to enter a passphrase (minimum 4 characters) which will need to add `SSL_PASSPHRASE=<YOUR PASSPHRASE>` to each `.env` file in the `api` and `client` directory. It will also prompt you to add specific details for the certificate (i.e. locality, country code, etc.) all of which you can enter `'.'` as the value except for the `Common Name` field which you can enter any value. Afterwards `server.cert` and `server.key` will be created which you can add `SSL_CRT_FILE=../server.cert` and `SSL_KEY_FILE=../server.key` to the `.env` files.

If you face an issue when running API server and receiving a 'credentials scrambled' error from Chrome, enter this URL `chrome://flags/#allow-insecure-localhost` and enable the option.

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

