const oracledb = require('oracledb');

async function queryExec(req, res) {
    
    let conn
    let result

    try {
        conn = oracledb.getConnection({
            /* your connections information here */
        });
        result = (await conn).execute(`your query here`
        )
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        //console.log(await result)
        res.json(await result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = queryExec;

//MODEL/CONTROLLER TRAZ INFORMAÇÕES DO BANCO DE DADOS EM FORMATO JSON