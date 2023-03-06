# Bookstore Api

# Bookstore (NESTJS & MONGODB)

## Overview
- A CRUD API for a bookstore

## Setting up for Development

- Clone project.
- Install Node ( >= 12.0.0).
- Install NPM.
- Install MongoDB.
- Run yarn install
- Copy .env.example to .env directory
- npm run start:dev

### Public API REST Endpoints

#### Create User

```js
POST /users/create
```

| Param    | Type   | Required |
| ------   | ------ | -------  |
| username | String | true     | 


#### User Login

```js
POST /auth/login
```

| Param    | Type   | Required |
| ------   | ------ | -------  |
| username | String | true     | 


#### Refresh Token

```js
POST /auth/refreshToken
```


#### Create Book

```js
POST /books
```

| Body Param       | Type   | Required |
| ------      | ------ | -------  |
| title       | String | true     | 
| description | String | true     |
| author      | String | true     |
| year        | String | true     |
| cover       | String | false    |

#### Update Book

```js
PUT /books/:id
```

| Path Param  | Type   | Required |
| ------      | ------ | -------  |
| id          | String | true    | 

| Body Param  | Type   | Required | 
| ------      | ------ | -------  |
| title       | String | false    | 
| description | String | false    |
| author      | String | false    |
| year        | String | false    |
| cover       | String | false    |
| version     | String | true     |


#### Get Single Book

```js
GET /books/:id
```

#### Get All Books

```js
GET /books
```

#### Delete Book

```js
DELETE /books/:id
```