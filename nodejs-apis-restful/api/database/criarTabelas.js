const ModeloTabela = require('../rotas/fornecedores/modeloTabelaFornecedor.js')

ModeloTabela
    .sync()
    .then(() => console.log('tabela criada'));