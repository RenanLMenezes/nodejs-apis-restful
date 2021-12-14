const roteador = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor.js')
const Fornecedor = require('./fornecedor.js')
const CampoInvalido = require('../../erros/CampoInvalido.js')
const { SerializadorFornecedor } = require('../../serializador.js')

roteador.get('/', async (req, res) => {
    const resultados = await tabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serealizar(res)
    )
})

roteador.get("/:idFornecedor", async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serealizar(res)
        )
    } catch (erro){
        proximo(erro)
    }

})

roteador.post('/', async (req, res, proximo) => {
    try{
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        res.status(201)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serealizar(res)
        )
    } catch (erro){
        proximo(erro)
    }
})

roteador.put('/:idFornecedor', async (req, res, proximo) =>{
    try{
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
    
}) 

roteador.delete('/:idFornecedor', async (req, res, proximo) => {
    try{
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end()
    } catch (erro){
        proximo(erro)
    }
})

module.exports = roteador