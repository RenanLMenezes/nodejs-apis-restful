const modelo = require("./modeloTableProduto")



module.exports = {
    listar (idFornecedor){
        return modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
    }
}