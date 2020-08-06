const express = require('express');
const app = express();
const PoolClass = require('pg').Pool;

// const { Pool } = require('pg')
// const pg = require('pg');
// const pgPool = pg.Pool;
const pool = new PoolClass({
    user: 'postgres',
    host: 'localhost',
    database: 'weatherTiler_development',
    port: 5432,
    password: ''
});

app.get('/',(req, res)=>{
    const query = 'SELECT * FROM city_weathers WHERE id > $1'
    const scaryDataFromInternet = 36;
    pool.query(query,[scaryDataFromInternet],(error, dbResponse)=>{
        console.log(dbResponse.rows)
        res.json(dbResponse.rows)
    })
    pool.end();
})


app.listen(3000)