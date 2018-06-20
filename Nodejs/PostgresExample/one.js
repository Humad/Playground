const {Pool, Client} = require('pg');

var config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: true
}

const pool = new Pool(config);

pool.query("SELECT * FROM events ORDER BY ts DESC LIMIT 10", function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res.rows);
    }
    pool.end();
});