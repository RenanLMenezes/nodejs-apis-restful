const { INSERT } = require('sequelize/types/lib/query-types')
const Fornecedor = require('./fornecedor')
const Modelo = require('./modeloTabelaFornecedor')

module.exports = {
    listar(){
        return Modelo.findAll()
    },
    inserir(){
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if(!encontrado){
            throw new Error ('Fornecedor não encontrado')
        }

        return encontrado
    },
    atualizar (id, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: {id: id}
            }
        )
    }
}