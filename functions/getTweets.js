module.exports.getTweets = async (mode) => {
    let tweetList = {"error": "empty"};
    const Twitter = require('twitter-lite');
    let clientinfo = require("../json/twitterclient.json")
    const user = new Twitter({
        consumer_key: clientinfo.API_KEY,
        consumer_secret: clientinfo.API_KEY_SECRET,
    });
    let response = await user.getBearerToken();
    const app = new Twitter({
        bearer_token: response.access_token,
    });
    let count = 0
    if(mode == "full"){
        count = 1000;
    }else if(mode == "latest"){
        count = 5;
    }
    let tweets = await app.get('statuses/user_timeline', {screen_name: 'CLG_Dubois_53', count: count, tweet_mode: 'extended'});
    let totaltweets = {}
    let i = 0;
    function TweetConstruct(tweets) {
        while(i < tweets.length){
            let tweet = {
                id: tweets[i].id_str,
                text: tweets[i].full_text,
                date: tweets[i].created_at,
                hashtags: tweets[i].entities.hashtags,
                user_mentions: tweets[i].entities.user_mentions,
                urls: tweets[i].entities.urls,
                deviceUsed: tweets[i].source,
                retweets: tweets[i].retweet_count,
                likes: tweets[i].favorite_count
            }
            totaltweets[i] = tweet;
            i++
            if(i == tweets.length){
                return totaltweets;
            }
        }
    }
    TweetConstruct(tweets);
    tweetList = totaltweets;
    return {
        tweetList
    };
}