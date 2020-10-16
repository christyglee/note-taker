// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

// set up express
var app = express();
var PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// get routes/redirects
// index.html
app.get("*", function(req, res) {
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

// api delete notes
app.delete("/api/notes/:id", function(req, res) {
    var getID = req.params.id;

    for (var i = 0; i < db.length; i++) {
        if (db[i].id === getID) {
          db.splice(i,1);
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
        if (err) throw err;
        res.json("Response");
    })
})

// post api/notes
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    let noteID = uuidv4();
    newNote.id = noteID;
    db.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
        if (err) throw err;
        res.json("Response");
    })

});

// start server
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT)
})

