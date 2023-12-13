const Sequelize = require('sequelize');
const database = require('./db');

// Define o modelo 'timebased' para interagir com a tabela correspondente no banco de dados
const timebased = database.define('timebased', {
    Tag: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    IMEI: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que cada IMEI seja único na tabela
    },
    ErroCode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    TSLPowerOn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // Valor padrão caso não seja fornecido
    },
    Timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

// Exporta o modelo 'timebased' para ser utilizado em outros módulos do projeto
module.exports = timebased;
