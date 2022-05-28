module.exports.getTweets = async () => {
    let tweetList = [];
    return {
        tweets: async function() {
            const Twitter = require('twitter-lite');
            const twitterClient = require("../json/twitterclient.json")
            (async function() {
                const user = new Twitter({
                    consumer_key: twitterClient.API_KEY,
                    consumer_secret: twitterClient.API_KEY_SECRET,
                });
            try {
                    let response = await user.getBearerToken();
                    const app = new Twitter({
                        bearer_token: response.access_token,
                    });
            // Search for recent tweets
                    response = await app.get(`/search/tweets`, {
                        q: "@CLG_Dubois_53", 
                        lang: "fr",    
                        count: 100,  
                    });
            for (tweet of response.statuses) {
                        console.dir(tweet.text);
                    }
                } catch(e) {
                    console.log("There was wit the API");
                    console.dir(e);
                }
            })();
        },
        get: async function() {
            return tweetList;
        }
    }
}