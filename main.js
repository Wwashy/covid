var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');


//mysql://b306d28a03c4b7:3ecbb6ab@us-cdbr-iron-east-01.cleardb.net/heroku_76b072eab9306cc?reconnect=true

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));


var connection = mysql.createPool({
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
    var sql = "INSERT INTO messages (sender_name,sender_message) VALUES('"+req.body.sender+"','"+req.body.message+"')";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('sent!');
    });
    res.sendFile(__dirname + '/index.html');
});
 app.listen(app.get('port'),(err)=>{if(err) throw err; console.log('listenning to port 3000',app.get('port'))});