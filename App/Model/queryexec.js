const oracledb = require('oracledb');

async function queryExec(req, res) {
    
    let conn
    let result

    try {
        conn = oracledb.getConnection({
            user: "dbamv",
            password: "odp3j#",
            connectString: "189.50.8.114:22036/mv2000.hospitalsantamonica.org"
        });
        result = (await conn).execute(`select 
                                    s.cd_os,
                                      s.ds_servico,
                                      s.nm_solicitante,
                                      se.nm_setor,
                                      s.dt_pedido
                                      
                                      from dbamv.solicitacao_os s
                                      inner join setor se
                                          on se.cd_setor = s.cd_setor

                                      where 1 = 1
                                          and s.cd_multi_empresa = 1
                                          and s.cd_oficina = 3
                                          and s.tp_situacao = 'S'
                                          and trunc(s.dt_pedido) <= to_date(sysdate)
                                          and trunc(s.dt_pedido) >= to_date(sysdate - 1)
                                          
                                          order by 1 desc`
        )
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        res.json(await result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = queryExec;

//MODEL/CONTROLLER TRAZ INFORMAÇÕES DO BANCO DE DADOS EM FORMATO JSON