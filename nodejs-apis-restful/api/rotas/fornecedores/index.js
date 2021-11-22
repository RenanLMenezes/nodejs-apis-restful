const roteador = require('express').Router()
const tabelaFornecedor = require('./tabelaFornecedor.js')
const Fornecedor = require('./fornecedor.js')

roteador.get('/', async (req, res) => {
    const resultados = await tabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.get("/:idFornecedor", async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (erro){
        res.send(
            JSON.stringify({
                mensagem: erro.mensage
            })
        )
    }

})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.put('/:idFornecedor', async (req, res) =>{
    try{
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.end()
    } catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.mensage
            })
        )
    }
    
}) 

module.exports = roteador