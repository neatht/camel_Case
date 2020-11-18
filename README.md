<h1 align="center">🛰️<br>Glowbal</h1>

<div align="center">
    <strong>An ePortfolio web app built on React and Express</strong>
</div>

<br/>

<div align="center">
    <a href="https://www.notion.so/camel_Case-0a5b3335242b4dbcb35522caebb87548">
        <img src="https://img.shields.io/badge/documentation-Notion-000000?style=for-the-badge&logo=Notion"/>
    </a>
    <a href="https://glowbal.us.to">
        <img src="https://img.shields.io/badge/Live_Link-AWS-232F3E?style=for-the-badge&logo=Amazon-AWS"/>
    </a>
</div>

<div align="center">
    <p>
        <a href="#tada-getting-started">Getting Started</a> •
        <a href="#memo-documentation">Documentation</a> •
        <a href="#raising_hand-contributors">Contributors</a>
    </p>
</div>


## :tada: Getting Started

### :house: Local Installation

These instructions will help you get a copy of the project up and running for development and testing. This project runs on an Express backend and React frontend with TypeScript. You will need `npm` and `yarn` installed to start.

#### 🤫 Environment Variables

Both the frontend and backend make use of environment variables that will need to be present out before building.

In both the `client` and `api` directories, there is an example `.example.env` which should be filled out and renamed to `.env`

`api/.env`

```
# Server settings
NODE_ENV=development
SERVER_PORT=5000

# Authentication settings
EMAIL_KEY=https://example.com/email
AUTH0_AUDIENCE=
AUTH0_ISSUER=
JWKS_URI=

# SSL settings
SSL_CRT_FILE=../server.cert
SSL_KEY_FILE=../server.key

# Database settings
DB_ENDPOINT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
```

`client/.env`
```
# API settings
REACT_APP_API_URL=https://localhost:5000/api/

# Authentication settings
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_AUDIENCE=
```

The keys used in the default deployment can be found in the #keys channel in Slack.

#### :lock: SSL certificate
Before running the API, you will need an SSL certificate. 

In the root directory, start by creating a certificate:
```
openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365 -nodes
```
To specify the certificates, in `api`, add the following lines to the `.env`:
```
SSL_CRT_FILE=../server.cert
SSL_KEY_FILE=../server.key
```

Self signed SSL certificates may be rejected by applications for dev. 
Some example workarounds:

```
In Chrome, into the address bar type, and enable:
	chrome://flags/#allow-insecure-localhost

In Postman, disable SSL verification
```

#### 🖥 API Server: Express

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

#### ⚛️ Client: React

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

## :memo: Documentation

### :art: Components: Storybook

The frontend React components are documented using [Storybook](https://storybook.js.org)

To start Storybook, in the `client` folder, run:

```
yarn storybook
```

In should open automatically, however the app can be found at:

```
localhost:6006
```

Note that some components will require the use of the API so you should also run the API server locally at the same time

### :computer: API: Stoplight

The backend routes are documented using [Stoplight](https://camelcase.stoplight.io)

It is hosted online at the above link.


## :raising_hand: Contributors

<table>
  <tr valign="top">
    <td align="center"><a href="https://github.com/seangayler"><img src="https://avatars1.githubusercontent.com/seangayler" width="100px;" alt="Sean Gayler"/><br /><sub><b>Sean Gayler</b></sub></a></td>
    <td align="center"><a href="https://github.com/neatht"><img src="https://avatars1.githubusercontent.com/neatht" width="100px;" alt="Nathan Harvey"/><br /><sub><b>Nathan Harvey</b></sub></a></td>
    <td align="center"><a href="https://github.com/edhinrichsen"><img src="https://avatars1.githubusercontent.com/edhinrichsen" width="100px;" alt="Edward Hinrichsen"/><br /><sub><b>Edward Hinrichsen</b></sub></a></td>
    <td align="center"><a href="https://github.com/taylor-johnston"><img src="https://avatars1.githubusercontent.com/taylor-johnston" width="100px;" alt="Taylor Johnston"/><br /><sub><b>Taylor Johnston</b></sub></a></td>
    <td align="center"><a href="https://github.com/kwhk"><img src="https://avatars1.githubusercontent.com/kwhk" width="100px;" alt="Nathan Harvey"/><br /><sub><b>Kevin Kim</b></sub></a></td>
  </tr>
</table>
