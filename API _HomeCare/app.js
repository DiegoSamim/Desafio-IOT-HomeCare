// Importa o framework Express e cria uma instância do aplicativo
const express = require('express');
const app = express();

// Importa os modelos de banco de dados para equipamentos e timebased
const Equipamentos = require('./models/equipamentos');
const TimeBased = require('./models/timebased');

// Configura o aplicativo para aceitar e processar dados no formato JSON
app.use(express.json());

// Rota para obter dados de equipamentos
app.get('/equipamentos/dados', async (req, res) => {
    try {
        // Busca todos os registros de equipamentos no banco de dados
        const equipamentos = await Equipamentos.findAll();
        // Retorna os dados em formato JSON como resposta
        res.json(equipamentos);
    } catch (error) {
        console.error('Erro ao buscar dados de equipamentos:', error);
        // Retorna uma resposta de erro com status 500 em caso de falha
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para obter dados timebased
app.get('/timebased/dados', async (req, res) => {
    try {
        // Busca todos os registros timebased no banco de dados
        const timebased = await TimeBased.findAll();
        // Retorna os dados em formato JSON como resposta
        res.json(timebased);
    } catch (error) {
        console.error('Erro ao buscar dados timebased:', error);
        // Retorna uma resposta de erro com status 500 em caso de falha
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para criar ou atualizar dados de equipamentos
app.post('/equipamentos', async (req, res) => {
    const { Tag, IMEI, Valor, Timestamp } = req.body;

    try {
        // Verifica se já existe um registro com o mesmo IMEI no banco de dados
        const equipamentoExistente = await Equipamentos.findOne({
            where: {
                IMEI: IMEI
            }
        });

        if (equipamentoExistente) {
            // Se existir, atualiza o registro com os novos dados
            await equipamentoExistente.update({
                Tag,
                Valor,
                Timestamp
            });

            return res.json({
                erro: false,
                mensagem: "Dados atualizados para o equipamento existente."
            });
        } else {
            // Se não existir, cria um novo registro
            await Equipamentos.create({
                Tag,
                IMEI,
                Valor,
                Timestamp
            });

            return res.json({
                erro: false,
                mensagem: "Novo equipamento criado e dados armazenados."
            });
        }
    } catch (error) {
        console.error('Erro ao processar a mensagem de equipamentos:', error);
        // Retorna uma resposta de erro com status 400 em caso de falha
        return res.status(400).json({
            erro: true,
            mensagem: "Erro no formato da mensagem de equipamentos",
            error: error.message
        });
    }
});

// Rota para criar ou atualizar dados timebased
app.post('/timebased', async (req, res) => {
    const { Tag, IMEI, ErroCode, TSLPowerOn, Timestamp } = req.body;

    try {
        // Verifica se já existe um registro com o mesmo IMEI na tabela timeBased
        const timeBasedExistente = await TimeBased.findOne({
            where: {
                IMEI: IMEI
            }
        });

        if (timeBasedExistente) {
            // Se existir, atualiza o registro com os novos dados
            await timeBasedExistente.update({
                Tag,
                ErroCode,
                TSLPowerOn,
                Timestamp
            });

            return res.json({
                erro: false,
                mensagem: "Dados timebased atualizados para o equipamento existente."
            });
        } else {
            // Se não existir, cria um novo registro
            await TimeBased.create({
                Tag,
                IMEI,
                ErroCode,
                TSLPowerOn,
                Timestamp
            });

            return res.json({
                erro: false,
                mensagem: "Novo registro timebased criado e dados armazenados."
            });
        }
    } catch (error) {
        console.error('Erro ao processar a mensagem timebased:', error);
        // Retorna uma resposta de erro com status 400 em caso de falha
        return res.status(400).json({
            erro: true,
            mensagem: "Erro no formato da mensagem timebased",
        });
    }
});

// Inicia o servidor na porta 8080 e exibe mensagem no console quando estiver pronto
app.listen(8080, () => {
    console.log("Servidor Iniciado - http://localhost:8080");
});
