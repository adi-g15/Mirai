const fetch = require("node-fetch");
const cheerio = require("cheerio");

/**
 * NOTE: BREAKING CHANGE
 * 
 * Earlier the function used to take a `finalArray` parameter, which was itself modified and returned, not each time we push to an empty array and return, handle the concatenation on client side if needed
 */
exports.handler = async (event, context) => {
    let { maxItem, title } = event.queryStringParameters;

    if (!maxItem || !title) {
        return {
            statusCode: 400,
            body: "Not all maxItem, title, finalArray query paramters passed"
        }
    }

    const url = "https://mangapark.net/search?orderby=views_a&q=" + encodeURI(title);
    const finalArray = []

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
        for (let i = 0; i < maxItem; i++) {
            if (
                $(".manga-list")
                    .children(".item")
                    .eq(i)
                    .children("table")
                    .children("tbody")
                    .children("tr")
                    .children("td")
                    .eq(1)
                    .children("h2")
                    .children("a")
                    .text()
                    .trim()
            ) {
                finalArray.push({
                    src: "MGPK",
                    thumb: $(".manga-list")
                        .children(".item")
                        .eq(i)
                        .children("table")
                        .children("tbody")
                        .children("tr")
                        .children("td")
                        .eq(0)
                        .children("a")
                        .children("img")
                        .attr("data-cfsrc"),
                    link:
                        "https://mangapark.net" +
                        $(".manga-list")
                            .children(".item")
                            .eq(i)
                            .children("table")
                            .children("tbody")
                            .children("tr")
                            .children("td")
                            .eq(1)
                            .children("h2")
                            .children("a")
                            .attr("href"),
                    title: $(".manga-list")
                        .children(".item")
                        .eq(i)
                        .children("table")
                        .children("tbody")
                        .children("tr")
                        .children("td")
                        .eq(1)
                        .children("h2")
                        .children("a")
                        .text()
                        .trim(),
                });
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(finalArray)
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
