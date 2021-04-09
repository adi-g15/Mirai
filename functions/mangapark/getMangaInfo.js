const fetch = require("node-fetch");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
    let { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: "url query paramter not passed"
        }
    }

    try {
        const html = await fetch(url)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                } else {
                    throw Error("Response Code: " + res.status)
                }
            });

        const $ = cheerio.load(html);
        let thumb = $(".cover").children("img").attr("data-cfsrc");
        let title = $(".pb-1").children("h2").children("a").text();
        let desc = $(".summary").text();
        if (desc.indexOf("[") !== -1) {
            desc = desc.substring(0, desc.indexOf("["));
        }
        let status = $(".attr")
            .children("tbody")
            .children("tr")
            .eq(8)
            .children("td")
            .text()
            .trim();
        let author = $(".attr")
            .children("tbody")
            .children("tr")
            .eq(4)
            .children("td")
            .text()
            .trim();

        const chapterList = [];

        //FIND OUT WHICH STREAM HAS MOST CHAPTERS

        const streamLen = [];
        const maxStreams = $(".stream").length;

        for (let i = 0; i < maxStreams; i++) {
            streamLen.push(
                $(".stream")
                    .eq(i)
                    .children("div")
                    .eq(0)
                    .children("div")
                    .eq(0)
                    .children("span")
                    .text()
            );
        }

        for (let i = 0; i < maxStreams; i++) {
            streamLen[i] = parseInt(streamLen[i].substring(1, 4));
        }

        const bestStream = streamLen.indexOf(Math.max(...streamLen));

        $(".stream")
            .eq(bestStream)
            .find(".tit")
            .each((i, el) => {
                let chapDate = $(el)
                    .parent()
                    .children(".ext")
                    .children(".time")
                    .text();
                chapDate = chapDate.replace(/\n+/g, "");
                chapDate = chapDate.trim();

                const chapObj = {
                    title: $(el).children("a").text(),
                    href:
                        "https://mangapark.net" + $(el).children("a").attr("href"),
                    release: chapDate,
                    views: "",
                };
                chapterList.push(chapObj);
            });

        return {
            statusCode: 200,
            body: JSON.stringify({
                mangaInfo: {
                    thumb: thumb,
                    title: title,
                    desc: desc,
                    status: status,
                    author: author,
                    lastUpdate: "",
                    chapterList: chapterList
                }
            })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
