const express = require('express');

const { router } = require('./routes/routerIndex');
const { client } = require('./utils/connection');

const app = express();

client.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// End point router
app.use('/', router);

// Error Handeler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server on port ${port}`));
