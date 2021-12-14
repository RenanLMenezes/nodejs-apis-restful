const ValorNaoSuportado = require("./erros/ValorNaoSuportado")

class Serializador {
    json(dados){
        return JSON.stringify(dados)
    }
    
    serealizar(dados){
        if(this.contentType === 'application/json'){
            returnthis.json(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }
}