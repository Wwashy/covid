var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
 app.listen(3000,(err)=>{if(err) throw err; console.log('listenning to port 3000')});