const tabelaProduto = require('./tabelaProduto')
const roteadorProdutos = require('express').Router({ mergeParams: true })

roteadorProdutos.get('/', async( req, res) => {
    const produtos = await tabelaProduto.listar(req.params.idFornecedor)
    res.send(
        JSON.stringify(produtos)
    )
})

module.exports = roteadorProdutos