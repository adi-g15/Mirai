const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    const navList = []

    // Fetch Gogoanime latest header links
    try {
        const html = await fetch("https://www.gogoanime1.com")
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })
        const $ = cheerio.load(html);

        $(".main-menu li").each((i, el) => {
            let link = {};
            link.href = $(el).find("a").attr("href");
            link.text = $(el).find("a").text();
            navList.push(link);
        });

        return {
            statusCode: 200,
            body: JSON.stringify(navList)
        }

    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        }
    }
}
