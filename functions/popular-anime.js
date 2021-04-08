const fetch = require("node-fetch");
const cheerio = require("cheerio");

// domain/.netlify/functions/namaste
exports.handler = async (event, context) => {
    try {
        const popularList = [];
        const html = await fetch("https://www.gogoanime1.com/home/popular-animes")
                                .then(response => {
                                if (response.ok) {   // response.status >= 200 & < 300
                                    return response.text();
                                } else {
                                    throw Error(response.statusText);
                                }
                                });

        console.log("Fetched popular anime");
        const $ = cheerio.load(html);
        console.log("Loaded... ", "Popular anime");

        $(".big-list .wide-anime-box").each((i, el) => {
            const genre = [];
            $(el)
                .find(".wab-links a")
                .each((_, ex) => {
                    genre.push($(ex).text());
                });

            const anime = {
                picture: $(el).find(".anime-image").attr("style"),
                link: $(el).find(".anime-image").attr("href"),
                name: $(el).find(".wab-title a").text(),
                description: $(el).find(".wab-desc").text(),
                genre: genre,
            };
            popularList.push(anime)
        });

        return {
            statusCode: 200,
            body: JSON.stringify(popularList)
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: err.code ?? 500,
            body: err.msg || err.message || "Server Error"
        };
    }
}
