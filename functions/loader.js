const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: "A `url` query parameter required"
        }
    }

    try {
        const html = await fetch(url)
            .then(res => {
                if (res.ok) {   // response.status >= 200 & < 300
                    return res.text();
                } else {
                    throw Error(res.statusText);
                }
            })

        const latestk = [];

        const $ = cheerio.load(html);
        $(".truyen-list .list-truyen-item-wrap").each((j, eld) => {
            const item = {
                mangaLink: $(eld).children().first("a").attr("href"),
                imageLink: $(eld).find("img").attr("src"),
                views: $(eld).find(".aye_icon").text(),
                description: $(eld).find("p").text(),
                title: $(eld).find("h3 a").text(),
                update: $(eld).find(".list-story-item-wrap-chapter").text(),
                updateLink: $(eld)
                    .find(".list-story-item-wrap-chapter")
                    .attr("href"),
            };

            latestk.push(item);
        });
        let total = $(".panel_page_number .group_qty").find("a").text();
        let linksk = [];
        $(".panel_page_number .group_page a").each((y, elx) => {
            let link = {};
            link.text = $(elx).text();
            link.href = $(elx).attr("href");
            link.class = $(elx).attr("class");
            linksk.push(link);
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                total,
                links: linksk,
                latest: latestk
            })
        };
    } catch(err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}