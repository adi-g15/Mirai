const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    let { pageNo } = event.queryStringParameters;

    if (!pageNo) {
        return {
            statusCode: 400,
            body: "pageNo query paramter not passed"
        }
    }

    const url = `https://mangapark.net/search?orderby=views_a&genres-exclude=smut&orderby=views_m&page=${pageNo}`;

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
        let mangaArr = [];
        if ($("body").find($(".no-match")).length === 0) {
            $(".manga-list")
                .children(".item")
                .each((idx, el) => {
                    let title = $(el)
                        .children("table")
                        .children("tbody")
                        .children("tr")
                        .children("td")
                        .eq(1)
                        .children("h2")
                        .children("a")
                        .text()
                        .trim();
                    let link = $(el)
                        .children("table")
                        .children("tbody")
                        .children("tr")
                        .children("td")
                        .eq(1)
                        .children("h2")
                        .children("a")
                        .attr("href");
                    link = "https://mangapark.net" + link;
                    const imageLink = $(el)
                        .children("table")
                        .children("tbody")
                        .children("tr")
                        .children("td")
                        .eq(0)
                        .children("a")
                        .children("img")
                        .attr("data-cfsrc");
                    const tempObj = {
                        description: "",
                        mangaName: title,
                        mangaLink: link,
                        imageLink: imageLink,
                    };

                    mangaArr.push(tempObj);
                });
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    LatestManga: mangaArr,
                })
            };
        } catch (err) {
            console.error(err);
            return {
                statusCode: 500
            };
        }
    }
