# Express REST API exercise (v3.0.0)
This is an Express REST API practice exercise.

To run the server simply write the following in your terminal:

    npm start

You will be able to connect via API to the following endpoints:

    [signup]
    (GET)https://localhost:8080/auth/signup => With email, password and name in the body to create a new user.

    [login]
    (POST)https://localhost:8080/auth/login => With email, and password in the body to login. This will return a JWT.

    [fetch all posts]
    (GET)https://localhost:8080/feed/posts => You need your Bearer JWT to access this route.

    [fetch a single post]
    (GET)https://localhost:8080/feed/post/{postId} => You need your Bearer JWT to access this route.

    [create a new post]
    (POST)https://localhost:8080/feed/post => With title, content, and an image in the body. You need your Bearer JWT to access this route.

    [edit a post]
    (PUT)https://localhost:8080/feed/post/{postId} => With title, content, or a new image in the body. You need your Bearer JWT to access this route.

    [delete a post]
    (DELETE)https://localhost:8080/feed/post/{postId} => You need your Bearer JWT to access this route.

## Versions:
* **(1.0.0)** Created the project.
* **(1.1.0)** Added CORS headers to routes.
* **(1.2.0)** Added [express-validator](https://www.npmjs.com/package/express-validator) package.
* **(1.3.0)** Added [mysql2](https://www.npmjs.com/package/mysql2) and [sequelize](https://www.npmjs.com/package/sequelize) packages.
* **(1.4.0)** Added [multer](https://www.npmjs.com/package/multer) package.
* **(2.0.0)** Added post functionality.
* **(2.1.0)** Added [bcryptjs](https://www.npmjs.com/package/bcryptjs) package.
* **(2.2.0)** Added [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package for restful authentication.
* **(3.0.0)** Added authorization and user functionality.

## Dependencies:
* [Express](https://www.npmjs.com/package/express)
* [express-validator](https://www.npmjs.com/package/express-validator)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [multer](https://www.npmjs.com/package/multer)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Dev Dependencies:
* [Nodemon](https://www.npmjs.com/package/nodemon)

## Debug dependencies:
* **(global)** [Nodemon](https://www.npmjs.com/package/nodemon)

## Database setup:
On `/utils/database.js` you can find all the database configuration. By default I'm using a MySQL Schema called "**express-rest-practice**".
