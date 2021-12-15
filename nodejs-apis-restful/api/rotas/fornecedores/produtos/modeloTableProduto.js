const sequelize = require("sequelize");
const instancia = require("../../../database");

const colunas =  {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../modeloTabelaFornecedor'),
            key: 'id'
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('peoduto', colunas, opcoes)