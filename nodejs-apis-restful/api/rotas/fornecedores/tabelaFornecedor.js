const { INSERT } = require('sequelize/types/lib/query-types')
const Fornecedor = require('./fornecedor')
const Modelo = require('./modeloTabelaFornecedor')
const NaoEncontrado = requise('../../erros/NaoEncontrado.js')

module.exports = {
    listar(){
        return Modelo.findAll({ raw: true })
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
            throw new NaoEncontrado()
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
    },
    remover (id){
        return Modelo.destroy({
            where: {id: id},
        })
    }
}