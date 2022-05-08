'use strict';

const express = require('express');
const { search } = require('./handler');

// App
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', [router]);
app.use('/test', async (req, res) => {
  const response = await search(req.query)

  res.send(response)
});

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
module.exports = app;
