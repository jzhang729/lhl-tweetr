"use strict";

// Basic express setup:
const config        = require("dotenv").config();
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = process.env.MONGODB_URI;
const DataHelpers   = require("./lib/data-helpers.js");
const tweetsRoutes  = require("./routes/tweets");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let dbInstance;

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) throw err;

    console.log("Connected to the database");

    dbInstance = db;

    app.listen(PORT, () => {
        console.log("Example app listening on port " + PORT);
    });

    app.use("/", tweetsRoutes(DataHelpers(dbInstance)));

    function gracefulShutdown() {
        console.log("Shutting down gracefully...");
        try {
            dbInstance.close();
        } catch (e) {
            console.log("Failed to disconnect from Mongo...");
            throw e;
        } finally {
            console.log("Bye for now");
            process.exit();
        }
    }

    process.on("SIGTERM", gracefulShutdown); // listen for TERM signal .e.g. kill
    process.on("SIGINT", gracefulShutdown);  // listen for INT signal e.g. Ctrl-C
});
