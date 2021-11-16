const roteador = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor.js')

roteador.use('/', async (req, res) =>{
    const resultados = await tabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

module.exports = roteador