// const express = require('express');
// const app = express();
// const { Client } = require('pg');
// require('dotenv').config();

// const DEV = true;
// const port = DEV ? 3000 : process.env.PORT;

// const client = new Client();


// client.connect()
// .then(() => console.log("Connected successfuly"))
// .catch(e => console.log(e))
// .finally(() => client.end());
// // if (DEV) {
// //     client = new Client({
// //     user: 'postgres',
// //     host: '127.0.0.1',
// //     database: 'leaderboard',
// //     port: '5432'
// // }) }
// //     else {new Client({
// //         connectionString: process.env.DATABASE_URL,
// //         database: 'leaderboard',
// //         ssl: {
// //             rejectUnauthorized: false
// //         }
// //     });
// // }
// // .then(() => console.log('Connected successfuly'))
// // .catch(e => console.log(e))
// //.finally(() => client.end);

// // app.get('/', (req, res) => {
// //     res.send('Hello World!');
// // });

// // app.listen(port, () => {
// //     if (DEV) console.log(`Example app listening at http://localhost:${port}`)
// // })








const { Client } = require('pg');

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

// const client = new Client({
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'leaderboard',
//     password: '5311427',
//     port: '5432'
// });

const client = new Client({
    user: 'aoduysddlafnsg',
    host: 'ec2-54-224-175-142.compute-1.amazonaws.com',
    database: 'de3edgaa83mrmk',
    password: 'bbb84a1a02b08620e4f0bfa1aef521ffe5f2996edb3d4a27fb4fca649ea6e8ab',
    port: '5432'
})

const player_uuid = 'somethia-gspe-cial-aiehgnwodlnt';
const player_name = 'Morty';
const player_score = 1;

client.connect()
.then(() => console.log("Connected successfuly"))
.then(() => client.query(`SELECT * FROM scores WHERE player_uuid = '${player_uuid}'`))
.then(results => {
    console.log(results.rowCount);
    // if (results.rowCount < 1) {
    //     client.query(`
    //     INSERT INTO scores (player_uuid, player_name, player_score)
    //     VALUES ('${player_uuid}', '${player_name}', ${player_score})
    //     `);
    //     console.log("done")
    // } else {
    //     console.log('else');
    //     client.query(`
    //     UPDATE scores
    //     SET player_name = '${player_name}', player_score = ${player_score}
    //     WHERE player_uuid = '${player_uuid}'
    //     `)
    // }
})
.then(() => client.query(`SELECT * FROM scores ORDER BY player_score DESC`))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end());
