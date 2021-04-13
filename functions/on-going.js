const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    // Fetch ongoing anime list
    const ongoingList = [];

    try {
        const html = await fetch("https://www.gogoanime1.com/home/ongoing")
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })

        const $ = cheerio.load(html);
        console.debug("Loaded Ongoing Anime");

        $(".big-list .bl-grid").each((i, el) => {
            const genre = [];
            $(el)
                .find(".blb-links a")
                .each((j, elj) => {
                    if (j <= 20) {
                        genre.push($(elj).text());
                    }
                });

            const ongoing = {
                mainLink: $(el).find(".blb-image").attr("href"),
                imageLink: $(el).find(".blb-image img").attr("src"),
                title: $(el).find(".blb-title").text(),
                genre: genre
            };
            ongoingList.push(ongoing);
        });

        return {
            statusCode: 200,
            body: JSON.stringify(ongoingList)
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        }
    }
}
