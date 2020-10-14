const { Client } = require('pg');

const ENV = "dev";
let databaseURL;
if (ENV == "dev") {
    databaseURL = "postgresql://postgres:5311427@localhost/leaderboard";
} else {
    databaseURL = process.env.DATABASE_URL;
}

const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
    user: "postgres",
    password: "5311427",
    host: "127.0.0.1",
    port: 5432,
    database: "leaderboard"
});

client.connect()
.then(() => {console.log("connected")})
.then(() => client.query("select * from playerscores"))
//.then(() => client.query("insert into playerscores values ($1, $2, $3)",[1738],["Nate"],[330]))
.then(results => console.table(results.rows))
.catch(e = console.log)
.finally(() => client.end())

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });