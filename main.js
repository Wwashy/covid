var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
 app.listen(app.get('port'),(err)=>{if(err) throw err; console.log('listenning to port 3000',app.get('port'))});