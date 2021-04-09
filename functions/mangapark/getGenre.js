const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    const genreList = [];
    try {
        const url = "https://mangapark.net/genre";

        const html = await fetch(url)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                } else {
                    throw Error("Response Code: " + res.status)
                }
            });

        const $ = cheerio.load(html);
        $("#top-genres")
            .children(".items")
            .children("div")
            .each((i, el) => {
                genreList.push({
                    link: `https://mangapark.net${$(el).children("a").eq(0).attr("href")}`,
                    title: $(el).children("a").eq(0).text(),
                });
            });

        return {
            statusCode: 200,
            body: JSON.stringify({
                genreList
            })
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
