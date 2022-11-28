const oracledb = require('oracledb');
const dbConfig = require('../Config/db');


async function initialize() {
    await oracledb.createPool(dbConfig.hrPool);
}

async function close() {
    await oracledb.getPool().close(0)
}

module.exports = {
    initialize,
    close
}
//CONFIGURAÇÃO DAS FUNÇÕES DE CONEXÃO DO BANCO