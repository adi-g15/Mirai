const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    let { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: "url query paramter not passed"
        }
    }

    try {
        url = url.substring(0, url.lastIndexOf("/"));

        const html = await fetch(url)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                } else {
                    throw Error("Response Code: " + res.status)
                }
            });

        const $ = cheerio.load(html);
        let prev = $(".board")
            .children(".info")
            .children("div")
            .children("p")
            .eq(0)
            .children("a")
            .attr("href");
        let next = $(".board")
            .children(".info")
            .children("div")
            .children("p")
            .eq(1)
            .children("a")
            .attr("href");
        prev = "https://mangapark.net" + prev;
        next = "https://mangapark.net" + next;
        const title = $(".page")
            .children(".content")
            .children("h2")
            .text()
            .replace("Webtoon", "")
            .trim();

        return {
            statusCode: 200,
            body: JSON.stringify({ name: title, next: next, back: prev })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
