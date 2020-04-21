let express = require('express');
let app = express();
let mysql = require('mysql');
let bodyparser = require('body-parser');


//mysql://b306d28a03c4b7:3ecbb6ab@us-cdbr-iron-east-01.cleardb.net/heroku_76b072eab9306cc?reconnect=true

app.set('port', (process.env.PORT || 3000));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));


let connection = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b306d28a03c4b7',
    password: '3ecbb6ab',
    database: 'heroku_76b072eab9306cc',
    multipleStatements: true
});

connection.getConnection((err) => {
    if (err) throw err;
    console.log('connected');
});
//get routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/feed', (req, res) => {
    res.sendFile(__dirname + '/feeder.html');
});
//date.now
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// insertion of data in various tables
//data for the global cases
app.post('/global', (req, res) => {
    let global = req.body.infection_count;
    let death = req.body.death_count;
    let recovery = req.body.recovery_count;
    let sql = "INSERT INTO global_stat(stat_infection,stat_recovered,stat_death,stat_date) VALUES('" + global + "','" + recovery + "','" + death + "','" + date + "');";
    connection.query(sql, (err, result) => {
        console.log("successful");
        res.sendFile(__dirname + '/index.html');
    });
});
//kenya cases
app.post('/kenya', (req, res) => {
    let infection = req.body.infection_count;
    let death = req.body.death_count;
    let recovery = req.body.recovery_count;
    let sql = "INSERT INTO kenya_stat(stat_infection,stat_recovered,stat_death,stat_date) VALUES('" + infection + "','" + recovery + "','" + death + "','" + date + "');";
    connection.query(sql, (err, result) => {
        console.log("successful");
        res.sendFile(__dirname + '/index.html');
    });
});

//get the traffic comment and messages
app.post('/message', (req, res) => {
    let sql = "INSERT INTO messages (sender_name,sender_message) VALUES('" + req.body.sender + "','" + req.body.message + "')";
    connection.query(sql, (err) => {
        if (err) throw err;
        console.log('sent!');
    });
    res.sendFile(__dirname + '/index.html');
});
// BLOG content...
app.post('/about', (req, res) => {
    let sql = "INSERT INTO about_content (content,content_date) VALUES('" + req.body.content + "','" + date + "');";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("sent!");
        res.sendFile(__dirname + '/feeder.html');
    });
});
app.post('/prevention', (req, res) => {
    let sql = "INSERT INTO prevention_content (content,content_date) VALUES('" + req.body.content + "','" + date + "');";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("sent!");
        res.sendFile(__dirname + '/feeder.html');
    });
});
app.post('/spread', (req, res) => {
    let sql = "INSERT INTO spead_content (content,content_date) VALUES('" + req.body.content + "','" + date + "');";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("sent!");
        res.sendFile(__dirname + '/feeder.html');
    });
});
app.post('/cure', (req, res) => {
    let sql = "INSERT INTO cure_content (content,content_date) VALUES('" + req.body.content + "','" + date + "');";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("sent!");
        res.sendFile(__dirname + '/feeder.html');
    });
});
app.post('/contact', (req, res) => {
    let sql = "INSERT INTO contact_content (content,content_date) VALUES('" + req.body.content + "','" + date + "');";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("sent!");
        res.sendFile(__dirname + '/feeder.html');
    });
})



//presents data to the boxes
//global
app.post('/data', (req, res) => {
    let sql = "SELECT * FROM global_stat WHERE stat_id = (SELECT MAX(stat_infection) FROM global_stat);";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        let data = {
            infection: result[0].stat_infection,
            recovered: result[0].stat_recovered,
            death: result[0].stat_death
        }
        res.send(data);
        console.log(data);
    });
});
//global
app.post('/dataKE', (req, res) => {
    let sql = "SELECT * FROM kenya_stat WHERE stat_id = (SELECT MAX(stat_infection) FROM kenya_stat);";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        let data = {
            infection: result[0].stat_infection,
            recovered: result[0].stat_recovered,
            death: result[0].stat_death
        }
        res.send(data);
        console.log(result);
    });
});

// inserts the data into the update textboxes on the feed for editting

app.post('/getBlog', (req, res) => {

    let sql = "\
    SELECT * FROM about_content;\
    SELECT * FROM prevention_content;\
    SELECT * FROM cure_content;\
    SELECT * FROM contact_content;\
    ";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        let data = {
            about: result[0][0].content,
            prevention: result[1][0].prevention_content.content,
            spread: result[2][0].spread_content.content,
            contact: result[3][0].contact_content.content
        }
        console.log(result)
        res.send(data);
    });
});

app.listen(app.get('port'), (err) => { if (err) throw err; console.log('listenning to port 3000', app.get('port')) });