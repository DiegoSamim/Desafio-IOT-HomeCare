const Sequelize = require('sequelize');
const database = require('./db');

// Define o modelo 'equipamentos' para interagir com a tabela correspondente no banco de dados
const equipamentos = database.define('equipamentos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Tag: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    IMEI: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que cada IMEI seja único na tabela
    },
    Valor: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

// Exporta o modelo 'equipamentos' para ser utilizado em outros módulos do projeto
module.exports = equipamentos;
