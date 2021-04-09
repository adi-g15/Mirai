const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    let { link, page } = event.queryStringParameters;

    if (!link || !page) {
        return {
            statusCode: 400,
            body: "Atleast one of link, page query paramters not passed"
        }
    }

    try {
        const url = link + `/${page}?views_t`;
        const html = await fetch(url)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                } else {
                    throw Error("Response Code: " + res.status)
                }
            });

            const $ = cheerio.load(html);
            let mangaArr = [];
            let tempObj = {};

            if ($("body").find($(".no-match")).length === 0) {
              $(".ls1")
                .children("div")
                .each((idx, el) => {
                  let title = $(el)
                    .children("div")
                    .children("h3")
                    .children("a")
                    .text()
                    .trim();
                  let link = $(el)
                    .children("div")
                    .children("h3")
                    .children("a")
                    .attr("href");
                  link = "https://mangapark.net" + link;
                  let imageLink = $(el)
                    .children("a")
                    .children("img")
                    .attr("data-cfsrc");
                  tempObj = {
                    description: "",
                    title: title,
                    link: link,
                    thumb: imageLink,
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
