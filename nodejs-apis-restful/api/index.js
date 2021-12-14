const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores/index.js')
const NaoEncontrado = require('./erros/NaoEncontrados.js')
const CampoInvalido = require('./erros/CampoInvalido.js')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos.js')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado.js')
const { formatos } = require('./serializador.js')




app.use(bodyParser.json())

app.use((req, res, proximo) =>{
    const formatoReq = req.header('Accept')

    if(formatoReq === '*/*'){
        formatoReq = 'application/json'
    }

    if(formatos.indexOf(formatoReq) === -1){
        res.status(406)
        res.end
        return
    }

    res.setHeader('Content-Type', formatoReq)
    proximo()
})



app.use('/api/fornecedores', roteador)

app.use((erro, req, res, proximo) =>{
    let status = 500
    if(erro instanceof NaoEncontrado){
        status = 404    
    }

    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
        status = 400
    }

    if (erro instanceof ValorNaoSuportado){
        status = 406
    }

    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: erro.mensage, 
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), ()=> {
    console.log('API funcionando');
})