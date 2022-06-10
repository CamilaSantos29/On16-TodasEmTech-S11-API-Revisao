// importo o express
const express = require('express');

//  importar a continuacao das rotas de pets
const seriesRoutes = require('./router/seriesRoutes')

// executar o express
const app = express()

// usar o body parser
app.use(express.json())

// criar uma rota raiz
app.use("/series", seriesRoutes)

// exportar para usar o server.js
module.exports = app
