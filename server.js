const express = require('express');
const app = express();
const db = require('./App/Model/dbModel');
const bodyparser = require('body-parser');
const cors = require('cors');
const queryExec = require('./App/Model/queryexec');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());


//STRART DO SERVIDOR COM O BANCO DE DADOS
async function startup() {
    console.log('Starting application');
    try {
        console.log('Initialing database module')
        await db.initialize()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

startup();

//ROTA QUE VAI EXECUTAR A API
app.use('/api', queryExec);
