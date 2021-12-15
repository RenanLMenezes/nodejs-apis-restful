const modelo = require("./modeloTableProduto")

module.exports = {
    listar(idFornecedor){
        return modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
    },
    inserir(dados){
        return modelo.create(dados)
    },
    remover(idProduto, idFornecedor){
        return modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }
}