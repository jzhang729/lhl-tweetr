"use strict";

const config = require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const tweets = require("../../data-files/initial-tweets.json");

MongoClient.connect(MONGODB_URI, (err, db) => {
    console.log("Clearing all tweets");

    db.collection("tweets").remove({}, (err, results) => {
        if (err) throw err;

        console.log(`Inserting ${tweets.length} tweets`);

        db.collection("tweets").insertMany(tweets, (err, results) => {
            if (err) throw err;

            console.log("Tweets in collection: \n", results.ops);
            console.log("Disconnecting from MongoDB");

            db.close();
        });
    });
});
