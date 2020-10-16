// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs")
var database = require("./db/db.json")

// set up express
var app = express();
var PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.stsatic("public"))

// notes arrays
var notes = [];


// get routes/redirects
// index.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// api notes
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


// api/clear clear tables!
// app.put("/api/clear", function(req, res) {
//     tables = [];
//     waitlist = [];
//     res.send("clear")
// })

// api/delete/table
app.delete("/api/delete/table", function(req, res) {
    var index = req.body.index;
    var temp = [];
    for (var i = 0; i < tables.length; i++) {
        if (i !== parseInt(index)) {
          temp.push(tables[i]);
        }
    }
    tables = temp;
    res.send("table removed")
})

// apie/delete/waitlist
app.delete("/api/delete/waitlist", function(req, res) {
    var index = req.body.index;
    var temp = [];
    for (var i = 0; i < tables.length; i++) {
        if (i !== parseInt(index)) {
          temp.push(waitlist[i]);
        }
    }
    waitlist = temp;
    res.send("waitlist removed")
})

// post api/tables
app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    console.log(newTable);
    if (tables.length < 5 ) {
        tables.push(newTable);
        res.send("Table")
    } else {
        waitlist.push(newTable);
        res.send();
    }
});


// start server
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT)
})
