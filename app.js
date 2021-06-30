const express = require('express');

const feedRoutes = require('./routes/feed');

const app = express();

// Parser Middleware
app.use(express.json());

// CORS headers (Allow access to all servers)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

const port = 3000;
app.listen(3000);
console.log(`listening on port ${port}`);