"use strict";

// Requires:
var Twit = require('twit');

// Search phrase:
var searchPhrase = "#react min_retweets:5 OR javascript min_retweets:5 OR #nodejs min_retweets:8 OR #jQuery min_retweets:5 OR #angular min_retweets:5 OR #mongoose min_retweets:5 filter:links"

function Bot() {

    // Api tokens for twitter:
    this.twitter = new Twit();

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
