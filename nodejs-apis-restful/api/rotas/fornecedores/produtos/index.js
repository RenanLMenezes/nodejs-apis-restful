const Produto = require('./Produto')
const tabelaProduto = require('./tabelaProduto')
const roteadorProdutos = require('express').Router({ mergeParams: true })

roteadorProdutos.get('/', async( req, res) => {
    const produtos = await tabelaProduto.listar(req.fornecedor.idFornecedor)
    res.send(
        JSON.stringify(produtos)
    )
})

roteadorProdutos.post('/', async ( req, res, proximo) => {
    try {
        const idFornecedor = req.fornecedor.idFornecedor
        const conteudo = req.body
        const dados = Object.assign({}, corpo, {fornecedor: idFornecedor})
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201)
        res.send(produto)
    } catch (erro) {
        proximo(erro)
    }
})

roteadorProdutos.delete('/:id', async(req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.fornecedor.idFornecedor
    }

    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
})


module.exports = roteadorProdutos