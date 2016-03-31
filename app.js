"use strict";

// Requires:
var Twit = require('twit');
var auth = require("./auth");

// Search phrase:
var searchPhrase = process.env.TWITTER_SEARCH_PHRASE;

function Bot() {

    // Api tokens for twitter:
    this.twitter = new Twit({consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET});

    this.searchPhrase = searchPhrase;
}

Bot.prototype.searchTweets = function() {

    var _this = this;

    var query = {
        q: this.searchPhrase,
        result_type: "recent"
    };

    this.twitter.get("search/tweets", query, function (err, tweets, response) {

        if (err) {
            console.log("There was an error retrieving tweets: " + JSON.stringify(err));
        }

        else {

            var id = {
                id: tweets.statuses[0].id_str
            };

            _this.twitter.post("statuses/retweet/:id", id, function (err, data, response) {

                if (err) {
                    return console.log("Could not retweet: " + id.id + ": " + JSON.stringify(err));

                } else {

                    console.log("TheGirlBot has successfully retweeted: " + id.id);
                }
            });
        }
    });
};

// Kick off theBotGirl:
var theBotGirl = new Bot();
theBotGirl.searchTweets();
