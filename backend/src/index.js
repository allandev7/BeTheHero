const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
 //colocar dominio do front end {origin: http//meufront.com} dentro do cors por seguranca, so seu dominio acessa

 app.use(express.json());

app.use(routes);

app.listen(3333);