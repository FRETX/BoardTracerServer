var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/boardtracer');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS macIds (id INTEGER PRIMARY KEY, macId TEXT, factoryTimestamp TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)");
    
});



var express = require('express');
var restapi = express();
var bodyParser = require('body-parser');
restapi.use(bodyParser.json()); 
// restapi.use(express.urlencoded());

restapi.get('/data', function(req, res){
	res.status(200);
    res.end();
    // db.get("SELECT value FROM macds", function(err, row){
    //     res.json({ "count" : row.value });
    // });
});

restapi.post('/data', function(req, res){
	// db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
	console.log("POST received");
	console.log(req.body);
	var macId = req.body.macId;
	var factoryTimestamp = req.body.fts;
	console.log("macId: " + macId);
	console.log("fts: " + factoryTimestamp);
	res.status(202); res.end();
    db.run("INSERT INTO macIds (macId , factoryTimestamp) VALUES (? , ?)", macId, factoryTimestamp, function(err, row){
        if (err){
            console.err(err);
            res.status(500);
        }
        else {
            res.status(200);
        }
        res.end();
    });
});


restapi.listen(3042);

console.log("Submit GET or POST to http://localhost:3042/data");