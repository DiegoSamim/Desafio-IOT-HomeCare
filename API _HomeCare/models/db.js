const Sequelize = require('sequelize');

// Configuração das credenciais do banco de dados
var db = 'homecare';
var usuario = 'root';
var senha = '12345';

// Cria uma instância do Sequelize para estabelecer a conexão com o banco de dados MySQL
const sequelize = new Sequelize(db, usuario, senha, {
    host: process.env.DB_HOST || 'localhost', // Configura o host do banco de dados, com fallback para 'localhost'
    dialect: 'mysql', // Indica que está sendo utilizado o MySQL como o banco de dados
});

// Sincroniza os modelos com o banco de dados e exibe uma mensagem de sucesso no console
sequelize.sync().then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
});

// Tenta autenticar a conexão com o banco de dados e exibe mensagens de sucesso ou erro no console
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso');
    })
    .catch(() => {
        console.log("ERRO: Conexão com o banco de dados não realizada");
    });

// Exporta a instância do Sequelize para ser utilizada em outros módulos do projeto
module.exports = sequelize;
