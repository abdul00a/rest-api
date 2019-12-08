const express = require('express');

const { router } = require('./routes/routerIndex');

const { client } = require('./utils/connection');

const app = express();

client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server on port ${port}`));
