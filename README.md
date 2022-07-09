# Welcome to the Blogs API documentation!

REST API for a blog. NodeJs, Express and ORM Sequelize were used to create the API. It is possible to do the CRUD operations for users and posts from users. The database is MySQL.

---

# Endpoints summary

    - [1 - POST `/user`]
    - [2 - POST `/login`]
    - [3 - GET `/user`]
    - [4 - GET `/user/:id`]
    - [5 - POST `/categories`]
    - [6 - GET `/categories`]
    - [7 - POST `/post`]
    - [8 - GET `/post`]
    - [9 - GET `post/:id`]
    - [10 - PUT `/post/:id`]
    - [11 - DELETE `post/:id`]
    - [12 - DELETE `/user/me`]
    - [13 - GET `post/search?q=:searchTerm`]

---

# Instructions to run the project on your machine:

1. Clone the repository
  * `git clone git@github.com:Vitor8/blogs-api.git`.
  * Enter in the folder
    * `cd blogs-api`

2. Install dependencies 
  * `npm install`

3. Start the projetct
  * `npm start`

---

### Unit tests execution


```sh
npm test
```
or
```sh
npm test tests/req07-createPost.test.js
```
or
```
npm test req07
```
---

## Linter

My code follows the basic pattern defined by Lint. To test run the command npm run lint

---

#### Status HTTP

All the answers follows the HTTP protocol and REST pattern.

---

#### Collections

The application tables have the following format:

- **Users**, contain data with the following structure:

  ```json
  {
    "id": 1,
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com", // unique
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- **Categories**, contain data with the following structure:

  ```json
  {
    "id": 18,
    "name": "News"
  }
  ```

- **PostsCategories**, contain data with the following structure:

  ```json
  {
    "postId": 50,
    "categoryId": 20
  }
  ```

- **BlogPosts**, contain data with the following structure:

  ```json
  {
    "id": 21,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 14, // esse é o id que referência usuário que é o autor do post
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.947Z",
  }
  ```

## Endpoints 

### 1 - POST `/user`

- The request body has the following format. As fields are mandatory!

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
  
- The `displayName` field must be a string with at least 8 characters.

- The `email` field will be considered valid if it has the format `<prefix>@<domain>` and is unique.

- The password must contain a string with 6 characters. 

- If there is a person with the same email in the base, the following error should be returned:

  ```json
  {
    "message": "User already registered"
  }
  ```

- Otherwise, , the post was successful. The return will be a `JWT` token:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

### 2 - POST `/login`

- The request body has the following format. As fields are mandatory!

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- If any of these fields is invalid or there is no corresponding user in the database, the return will have a status of 400 with the body `{ message: "Invalid fields" }`.

- If everything is okay with the login, the answer is a json with a `JWT` token

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

### 3 - GET `/user`

- List all **Users** and return them in the following structure:

  ```json
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

- The request must have an authentication token in the headers. Otherwise the return will be a `status 401` code.

### 4 - GET `/user/:id`

- Returns user details based on the `id` of the route. The data must have the following format:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
  
- The request must have an authentication token in the headers. Otherwise the return will be a `status 401` code.

### 5 - POST `/categories`

- This endpoint receives a _Category_ in the body of the request and creates it in the database. The request body must have the following structure:

 ```json
  {
    "name": "Innovation"
  }
  ```

- If the body does not contain the `name` key, the API return a `status 400` error.

- The request must have an authentication token in the headers. Otherwise the return will be a `status 401` code.

### GET `/categories`

- List all categories with the following format:

```json
[
  {
    "id": 1,
    "name": "School"
  },
  {
    "id": 2,
    "name": "Innovation"
  }
]
```

### 7 - POST `/post`

- This endpoint must receive a _BlogPost_ in the body of the request and create it in the database. The request body has the following structure. All fields are mandatory!

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- The request must have an authentication token in the headers. Otherwise the return will be a `status 401` code.

### 8 - GET `/post`

- List all _BlogPosts_ and return them with the following format:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

### 9 - GET `post/:id`

- Returns a **BlogPost** with the specified `id`. The return has the following format:

```json
  {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```

### 10 - PUT `/post/:id`

- The endpoint receives a **BlogPost** that will overwrite the original with the `id` specified in the URL. Should only be allowed to the user who created the **BlogPost**.

- The requisition body has the following format. All fields are mandatory

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

### 11 - DELETE `post/:id`

- Delete a post with a specified `id.

### 12 - DELETE `/user/me`

- Delete a user specified in the `JWT` token .

### 13 - GET `post/search?q=:searchTerm`

- Retorn a **BlogPosts** that contain the searchTerm in its title or content. The answer has the following format:

```json
[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
  ```
