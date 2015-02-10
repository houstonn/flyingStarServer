var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('externalDB.db');

db.serialize(function() {
    //db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");
    //db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});



var express = require('express');
var app = express();
var year = 2000;
var month = 1;
var day = 1;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var selectStatment = "SELECT * FROM data WHERE year = "

app.get('/data', function(req, res){
    db.get("SELECT * FROM data", function(err, row){
        res.json({ "year" : row.year, 
                  "month" : row.month});
    });
});

app.get('/data/:year', function(req, res){
    year = req.params.year;
    db.get(selectStatment + year, function(err, row){
        res.json({ "year" : row.year, "month" : row.month, "day" : row.day});
    });
});

app.get('/data/:year/:month', function(req, res){
    year = req.params.year;
    month = req.params.month;
    db.get(selectStatment + year + " and month = " + month, function(err, row){
            res.json({ "year" : row.year, "month" : row.month, "day" : row.day, "day" : row.day, 
                      "c_year" :row.c_year, "c_year_t":row.c_year_t, "c_year_d":row.c_year_d,
                      "c_month" :row.c_month, "c_month_t":row.c_month_t, "c_month_d":row.c_month_d,
                      "c_day" :row.c_day, "c_day_t":row.c_day_t, "c_day_d":row.c_day_d,
                      "star_year" :row.star_year, "star_month":row.star_month, "star_day":row.star_day, 
                      "star_day_direction" :row.star_day_direction,
                      "festival_day_cn" :row.festival_day_cn, "festival_day_en":row.festival_day_en,
                      "direction_reverse":row.direction_reverse
                     });
    });
});

app.get('/data/:year/:month/:day', function(req, res){
    year = req.params.year;
    month = req.params.month;
    day = req.params.day;
    db.get(selectStatment + year + " and month = " + month+ " and day = " + day, function(err, row){
        if (err){
            res.status(500);}
        else{
            res.json({ "year" : row.year, "month" : row.month, "day" : row.day, "day" : row.day, 
                      "c_year" :row.c_year, "c_year_t":row.c_year_t, "c_year_d":row.c_year_d,
                      "c_month" :row.c_month, "c_month_t":row.c_month_t, "c_month_d":row.c_month_d,
                      "c_day" :row.c_day, "c_day_t":row.c_day_t, "c_day_d":row.c_day_d,
                      "star_year" :row.star_year, "star_month":row.star_month, "star_day":row.star_day, 
                      "star_day_direction" :row.star_day_direction,
                      "festival_day_cn" :row.festival_day_cn, "festival_day_en":row.festival_day_en,
                      "direction_reverse":row.direction_reverse
                     });
        }
    });
});


server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});