const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    try {
        const navList = []
        const updateList = []
        const newAnimeList = []

        console.debug("Fetching gogoanime");
        const html = await fetch("https://www.gogoanime1.com")
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })

        const $ = cheerio.load(html);
        console.debug("Loaded UpdatedLinks");

        $(".main-menu li").each((_, el) => {
            const link = {
                href: $(el).find("a").attr("href"),
                text: $(el).find("a").text(),
            };
            navList.push(link);
        });

        $(".animeList .nl-item").each((i, el) => {
            const update = {
                mainLink: $(el).find(".nli-image").attr("href"),
                imageLink: $(el).find(".nli-image img").attr("src"),
                epLink: $(el).find(".nli-ep").attr("href"),
                epName: $(el).find(".nli-ep").text(),
                epUpdate: $(el).find(".release").text()
            };
            updateList.push(update);
        });

        $(".tnTabber .bl-grid").each((i, el) => {
            const genre = [];

            $(el)
                .find(".blb-links a")
                .each((_, elv) => {
                    genre.push($(elv).text());
                });

            const newanime = {
                animeLink: $(el).find(".blb-image").attr("href"),
                imageLink: $(el).find(".blb-image img").attr("src"),
                animeTitle: $(el).find(".blb-title").text(),
                genre: genre
            };
            newAnimeList.push(newanime);
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                navList,
                updateList,
                newAnimeList
            })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: err.code ?? 500,
            body: err.msg || err.message || "Server Error"
        };
    }
}
