let express = require('express');
let app = express();
let mysql = require('mysql');
let bodyparser = require('body-parser');


//mysql://b306d28a03c4b7:3ecbb6ab@us-cdbr-iron-east-01.cleardb.net/heroku_76b072eab9306cc?reconnect=true

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));


let connection = mysql.createPool({
    connectionLimit: 100,
    host:'us-cdbr-iron-east-01.cleardb.net',
    user: 'b306d28a03c4b7',
    password:'3ecbb6ab',
    database: 'heroku_76b072eab9306cc',
    multipleStatements: true
});

connection.getConnection((err)=>{
if(err) throw err;
console.log('connected');
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
app.post('/message',(req,res)=>{
    let sql = "INSERT INTO messages (sender_name,sender_message) VALUES('"+req.body.sender+"','"+req.body.message+"')";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('sent!');
    });
    res.sendFile(__dirname + '/index.html');
});
//global
app.post('/data',(req,res)=>{
    let sql = "SELECT * FROM global_stat;";
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        let data ={
            infection:result[0].stat_infection,
            recovered: result[0].stat_recovered,
            death:result[0].stat_death
        }
        res.send(data);
        console.log(data);
    });
});
//global
app.post('/dataKE',(req,res)=>{
    let sql = "SELECT * FROM kenya_stat;";
    connection.query(sql,(err,result)=>{
        if (err) throw err;
        let data ={
            infection: result[0].stat_infection,
            recovered: result[0].stat_recovered,
            death: result[0].stat_death
        }
        res.send(data);
        console.log(result);
    });
});
// updates the content
app.post('/getBlog',(req,res)=>{

    let sql = "\
    SELECT * FROM about_content;\
    SELECT * FROM prevention_content;\
    SELECT * FROM cure_content;\
    SELECT * FROM contact_content;\
    ";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        let data ={
            about:result.about_content.content,
            prevention:result.prevention_content.content,
            spread:result.spread_content.content,
            contact: result.contact_content.content
        }
        res.send(data);
    });
});
 app.listen(app.get('port'),(err)=>{if(err) throw err; console.log('listenning to port 3000',app.get('port'))});