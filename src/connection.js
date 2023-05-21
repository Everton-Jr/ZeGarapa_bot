// database
const mysql = require('mysql');

const CONNECTION = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot_ze_garapa_db'
});

// start and check mysql connection
CONNECTION.connect((err) => {
    if (err) {
        console.log(`Mysql connection error: ${err}`);
        return;
    }
});

// query exemple
/* conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
}); */


// connection end exemple
/* conn.end(); */


module.exports = { CONNECTION };