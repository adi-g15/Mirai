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
            const streamLen = [];
            const maxStreams = 0;

            maxStreams = $(".stream").length;

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

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: $(".stream")
                  .eq(bestStream)
                  .find(".tit")
                  .eq(0)
                  .children("a")
                  .text(),
              })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
