const Modelos = [
    require('../rotas/fornecedores/modeloTabelaFornecedor.js'),
    require('../rotas/fornecedores/produtos/modeloTableProduto.js')
]

async function criarTabelas () {
    for (let i = 0; i < Modelos.length; i++){
        const modelo = Modelos[i]
        await modelo.sync()
    }
}

criarTabelas()