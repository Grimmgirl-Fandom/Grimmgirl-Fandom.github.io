const port = 60000
const express = require('express');
const app = express();
app.use("/", express.static(__dirname+"/public"))
app.listen(port, function (error) {
    if (error) throw error
    connectMongo()
    console.log("Server created Successfully")
});


const path = require('path')
const bodyParser = require('body-parser')


// Connection to Postgres
const { Pool } = require('pg') // connecting to postgres
const { CommandCompleteMessage, closeComplete } = require('pg-protocol/dist/messages')
const pool = new Pool({
    user: 'gswensonhollis_123',
    host: 'localhost',
    database: 'gswensonhollis',
    password: '12345678',
    port: 5432,
  })
console.log("Created pool ", pool)



//connect to mongo
const { MongoClient } = require('mongodb');
const { error } = require('console');
const { setDefaultAutoSelectFamily } = require('net');
const uri = "mongodb://127.0.0.1/gswensonho";
const client = new MongoClient(uri, { useUnifiedTopology: true });



//app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
// static pages are in a directory named public where node was started
app.use("/", express.static(path.join(__dirname)))






// just get a list of the regisered ports
async function poolTable1(req, res) {
    let client = null;
    try {
        client = await pool.connect();
        const dbres = await client.query("select color_name,hex_value,r_value,g_value,b_value,c_value,m_value,y_value,k_value from color full outer join hex on color.hex_id=hex.hex_id full outer join rgb on color.rgb_id=rgb.rgb_id full outer join cmyk on color.cmyk_id=cmyk.cmyk_id")

        //

        //console.log(dbres)
        const jsonContent = JSON.stringify(dbres);
        res.end(jsonContent);
    }  catch (err) {
        console.log(err);
    } finally {
        if (client != null) {
            client.release();
        }
    }
}

async function poolTable2(req, res) {
    let client = null;
    try {
        client = await pool.connect();
        const dbres = await client.query("select primary_type, color_name from primary_type full outer join primary_color on primary_type.primary_type_id=primary_color.primary_type_id inner join color on primary_color.color_id=color.color_id")
        //

        //console.log(dbres)
        const jsonContent = JSON.stringify(dbres);
        res.end(jsonContent);
    }  catch (err) {
        console.log(err);
    } finally {
        if (client != null) {
            client.release();
        }
    }
}

async function poolTable3(req, res) {
    let client = null;
    try {
        client = await pool.connect();
        const dbres = await client.query("select * from mix_type")

        //

        //console.log(dbres)
        const jsonContent = JSON.stringify(dbres);
        res.end(jsonContent);
    }  catch (err) {
        console.log(err);
    } finally {
        if (client != null) {
            client.release();
        }
    }
}






// another retuest handler
app.post('/sql1', function (req, res) {
    console.log("just return a table");
    poolTable1(req, res);
});

app.post('/sql2', function (req, res) {
    console.log("just return a table");
    poolTable2(req, res);
});

app.post('/sql3', function (req, res) {
    console.log("just return a table");
    poolTable3(req, res);
});


app.post('/mongo1', function (req, res) {
    console.log("just return a table");
    doQueryA(req, res);
});


app.post('/mongo2', function (req, res) {
    console.log("just return a table");
    doQueryB(req, res);
});


app.post('/mongo3', function (req, res) {
    console.log("just return a table");
    doQueryC(req, res);
});



/**
async function main(){
try {
await client.connect();
await doQueryA(client);
} catch (e) {
console.error(e);
} finally {
await client.close();
console.log("Really done main");
}
}
**/

let cc = 0
async function connectMongo() {
 await client.connect();
 console.log(`Connected to Mongo!! ${cc++}`)
}

async function doQueryA(req, res) {
    let spec = { }
    let results = await client.db().collection('color').find(spec).toArray();
    const jsonContent = JSON.stringify(results);
    res.end(jsonContent);
    }

async function doQueryB(req, res) {
    let spec = { }
    let results = await client.db().collection('primary').find(spec).toArray();
    const jsonContent = JSON.stringify(results);
    res.end(jsonContent);
    }
   
async function doQueryC(req, res) {
    let spec = { }
    let results = await client.db().collection('mix').find(spec).toArray();
    const jsonContent = JSON.stringify(results);
    res.end(jsonContent);
    }    

//main();

