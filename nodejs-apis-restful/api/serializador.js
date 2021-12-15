const ValorNaoSuportado = require("./erros/ValorNaoSuportado")
const jsontoxml = require('jsontoxml')

class Serializador {
    json(dados){
        return JSON.stringify(dados)
    }

    xml(dados){
        let tag = this.tagSingular

        if(Array.isArray(dados)){
            tag = this.tagPlural
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({ [tag]: dados })
    }
    
    serealizar(dados){
        dados = this.filtrar(dados)
        if(this.contentType === 'application/json'){
            return this.json(dados)
        }

        if(this.contentType === 'application/xml'){
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto(dados){
        const novoObjeto = {}

        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)){
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar(dados){
        if(Array.isArray(dados)){
            dados = dados.map( item => {
                return this.filtrarObjeto(dados)
            })
        } else {
            dados = this. filtrarObjeto(dados)
        }

        return dados
    }
}

class SerializadorFornecedor extends Serializador{
    constructor(contentType, camposExtras){
        super()
        this.contentType = contentType
        this.camposPublicos = ['id', 'empresa', 'categoria'].concat(camposExtras || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorErro extends Serializador{
    constructor(){
        super()
        this.contentType = this.contentType
        this.camposPublicos = ['mensagem', 'id'].concat(camposExtras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatos: ['application/json', 'application/xml'],
    SerializadorErro: SerializadorErro
}