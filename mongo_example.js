"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

console.log(`Connecting to MongoDB running at ${MONGODB_URI}`);

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        console.log("Could not connect! Unexpected error. Details below.");
        throw err;
    }

    console.log("Connected to the database!");

    function getTweets(callback) {
        db.collection("tweets").find().toArray((err, results) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, results);
            }
        });
    };

    getTweets((err, tweets) => {
        if (err) throw err;

        console.log("Logging each tweet");

        for (let tweet of tweets) {
            console.log(tweet);
        };
    });

    db.close();
})
