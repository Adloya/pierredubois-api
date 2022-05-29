console.clear()
const lnews = require('./functions/getLatestNews.js');
const twitter = require('./functions/getTweets.js');

const fs = require('fs');
const express = require('express');
const api = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const jsonres = {
    "success": null,
    "message": "",
    "status": "",
    "source": "error",
    "content": {}
}

api.get('/', async(req, res) => {
    jsonres.success = false;
    jsonres.message = "Hello World ! Bienvenue sur l'API Pierre Dubois ! Vous n'avez fait aucune requête. Commencez avec /dubnews, /twitter ou /youtube";
    jsonres.status = "400";
    jsonres.source = "error";
    jsonres.content = {};
    res.send(jsonres)
})

api.get('/latestnews', async(req, res) => {
    // // if the news are older than 5 min, update the news in the json file
    // if(await (await prisma.latestnews.findMany({where: {type: {equals: "news"}}}))[0] === undefined || await (await prisma.latestnews.findMany({where: {type: {equals: "news"}}}))[0].lastmodified === 0 || await (await prisma.latestnews.findMany({where: {type: {equals: "news"}}}))[0].lastmodified === undefined){
    //     let n = lnews.getNews().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; res.send(jsonres)});
    //     await (await n).news().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; res.send(jsonres)});
    //     jsonres.success = true;
    //     jsonres.message = "News récupérées avec succès !";
    //     jsonres.status = "200";
    //     jsonres.source = "site"
    //     jsonres.content = (await (await n).get().catch((err) => {jsonres.success = false; jsonres.message = "Erreur lors de la récupération des news"; jsonres.status = "500"; return console.log(err)}));
    //     await prisma.latestnews.deleteMany({where: {type: {equals: "news"}}}).catch((err) => console.log(err))
    //     prisma.latestnews.create({
    //         data: {
    //             lastmodified: Date.now(),
    //             content: jsonres.content,
    //             type: "news"
    //         }
    //     }).catch((err) => console.log(err))
    //     res.send(jsonres)
    // }else if(Date.now() - await (await prisma.latestnews.findMany({where: {type: {equals: "news"}}}))[0].lastmodified > 1800000) {
    //     let n = lnews.getNews().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; jsonres.content = {}; jsonres.source = "errorhandler"; return res.send(jsonres)});
    //     await (await n).news().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; jsonres.content = {}; jsonres.source = "errorhandler"; return res.send(jsonres)});
    //     jsonres.success = true;
    //     jsonres.message = "News récupérées avec succès !";
    //     jsonres.status = "200";
    //     jsonres.source = "site"
    //     jsonres.content = (await (await n).get().catch((err) => {jsonres.success = false; jsonres.message = "Erreur lors de la récupération des news"; jsonres.status = "500"; jsonres.content = {}; jsonres.source = "errorhandler"; return console.log(err)}));
    //     await prisma.latestnews.deleteMany({where: {type: {equals: "news"}}}).catch((err) => console.log(err))
    //     prisma.latestnews.create({
    //         data: {
    //             lastmodified: Date.now(),
    //             content: jsonres.content,
    //             type: "news"
    //         }
    //     }).catch((err) => console.log(err))
    //     res.send(jsonres);
    // }else{
    //     jsonres.success = true;
    //     jsonres.message = "News récupérées avec succès !";
    //     jsonres.status = "200";
    //     jsonres.source = "savefile"
    //     jsonres.content = (await prisma.latestnews.findMany({where: {type: {equals: "news"}}}))[0].content;
    //     res.send(jsonres);
    // }
    jsonres.success = false;
    jsonres.message = "Cette fonctionnalité a été suspendue car elle surchargeait le site du collège";
    jsonres.status = "500";
    jsonres.source = "error";
    jsonres.content = {};
    res.send(jsonres);
})

api.get('/dubnews', async(req, res) => {
    jsonres.success = false;
    jsonres.message = "La fonctionnalité n'est pas encore disponible";
    jsonres.status = "500";
    jsonres.source = "errorhandler";
    jsonres.content = {};
    res.send(jsonres)
})

api.get('/twitter', async(req, res) => {
    // let n = twitter.getTweets().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; res.send(jsonres)});
    // await (await n).tweets().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; jsonres.source = "error"; res.send(jsonres); return console.log(err);});
    jsonres.success = true;
    jsonres.message = "Tweets récupérés avec succès !";
    jsonres.status = "200";
    jsonres.source = "twitter";
    // jsonres.content = (await (await n).get().catch((err) => {jsonres.success = false; jsonres.message = "Erreur lors de la récupération des news"; jsonres.status = "500"; return console.log(err)}));    
    // Get tweetlist from getTweets.js
    let content = (await twitter.getTweets("full")).tweetList;
    if(content.error){
        jsonres.success = false;
        jsonres.message = "Erreur Serveur";
        jsonres.content = content;
        jsonres.status = "500";
        jsonres.source = "errorhandler";
    }else{
        jsonres.content = content;
    }
    res.send(jsonres)
})

api.get('/latest_tweets', async(req, res) => {
    // let n = twitter.getTweets().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; res.send(jsonres)});
    // await (await n).tweets().catch((err) => {jsonres.success = false; jsonres.message = err; jsonres.status = "500"; jsonres.source = "error"; res.send(jsonres); return console.log(err);});
    jsonres.success = true;
    jsonres.message = "Derniers tweets récupérés avec succès !";
    jsonres.status = "200";
    jsonres.source = "twitter";
    // jsonres.content = (await (await n).get().catch((err) => {jsonres.success = false; jsonres.message = "Erreur lors de la récupération des news"; jsonres.status = "500"; return console.log(err)}));    
    // Get tweetlist from getTweets.js
    let content = (await twitter.getTweets("latest")).tweetList;
    if(content.error){
        jsonres.success = false;
        jsonres.message = "Erreur Serveur";
        jsonres.content = content;
        jsonres.status = "500";
        jsonres.source = "errorhandler";
    }else{
        jsonres.content = content;
    }
    res.send(jsonres)
})

api.get('/youtube', async(req, res) => {
    jsonres.success = false;
    jsonres.message = "La fonctionnalité n'est pas encore disponible";
    jsonres.status = "500";
    jsonres.source = "errorhandler";
    jsonres.content = {};
    res.send(jsonres)
})

api.get('/allnews', async(req, res) => {
    jsonres.success = false;
    jsonres.message = "La fonctionnalité n'est pas encore disponible";
    jsonres.status = "500";
    jsonres.source = "errorhandler";
    jsonres.content = {};
    res.send(jsonres)
})

api.use(function(req, res, next){
    res.status(404);
    //respond with json
    if (req.accepts('json')) {
        jsonres.success = false;
        jsonres.message = "Introuvable";
        jsonres.status = "404";
        jsonres.source = "errorhandler";
        res.send(jsonres);
      return;
    }
});

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => {
    console.log(`API running on port ${ PORT }\nDEBUG: http://localhost:${PORT}/\nPRODUCTION: https://pierredubois-api.herokuapp.com/\n(*) Execution logs :\n`);
});