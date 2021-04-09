const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    const mangaArr = [];
    const url = "https://mangapark.net/latest";
    try {
        const html = await fetch(url)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                } else {
                    throw Error("Response Code: " + res.status)
                }
            })

        const $ = cheerio.load(html);

        if ($("body").find($(".no-match")).length === 0) {
            $(".ls1")
                .children("div")
                .each((idx, el) => {
                    let title = $(el)
                        .children("ul")
                        .children("h3")
                        .children("a")
                        .text()
                        .trim();
                    let link = $(el)
                        .children("a")

                        .attr("href");
                    link = "https://mangapark.net" + link;
                    let imageLink = $(el)
                        .children("a")
                        .children("img")
                        .attr("data-cfsrc");
                    const tempObj = {
                        description: "",
                        title: title,
                        mangaLink: link,
                        imageLink: imageLink,
                        update: "",
                        updateLink: "",
                    };
                    mangaArr.push(tempObj);
                });
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                LatestManga: mangaArr
            })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
