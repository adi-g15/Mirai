const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    const url = event.queryStringParameters['url'] || "https://www.gogoanime1.com/home/anime-list";
    const series = [];

    console.log(url);
    try {
        const html = await fetch(url)
        .then(res => res.text());

        const $ = cheerio.load(html);

        $(".container-left .container-item").each((i, el) => {
            let index = $(el).find(".ci-title").text();
            let linkstoindex = $(el).find("li");

            const links = [];
            linkstoindex.each((j, elx) => {
                const info = {
                    href: $(elx).find("a").attr("href"),
                    text: $(elx).find("a").text(),    
                };
                links.push(info);
            });

            series.push({ index, links });
        });
        return {
            statusCode: 200,
            body: JSON.stringify(series)
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
