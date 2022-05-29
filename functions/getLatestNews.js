module.exports.getNews = async () => {
    const newslist = {}
    return {
        news: async function() {
            const puppeteer = require('puppeteer');
            const urls = require("../json/urls.json");
            const browser = await puppeteer.launch({
                  headless: false,
                  args: ['--no-sandbox','--disable-setuid-sandbox']
            }).catch((err) => {
                return console.log(err);
            })
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 })
            await page.goto(urls.dernieres_actus);

            await page.evaluate(async () => {
                let i = 1
                let totalnews = {}
                while(i < document.querySelectorAll('article').length){
                    let article = document.querySelectorAll('article')[i];
                    let title = article.querySelector('h2').innerText;
                    let link = article.querySelector('a').href;
                    let author = article.querySelector('p.post-meta').children[0].innerText;
                    let date = article.querySelector('p.post-meta').children[1].innerText;
                    let description = article.querySelectorAll('p')[1].innerText;
                    let image = article.querySelector('img').src;
                    let news = {
                        id: i,
                        title: title,
                        link: link,
                        author: author,
                        date: date,
                        description: description,
                        image: image
                    }
                    totalnews[i] = news
                    i++
                }
                return {totalnews}
            }).then(async (totalnews) => {
                newslist[totalnews.totalnews.id] = totalnews.totalnews
                await browser.close();
            }).catch((err) => {
                return console.log(err)
            })
        },
        get: async function() {
            return newslist;
        }
    }
}