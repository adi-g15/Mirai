exports.handler = async (event, context) => {
    try {
        const { link } = event.queryStringParameters;
        if (!link) {
            return {
                statusCode: 400, // Bad Request
                body: "A link query parameter was not passed"
            }
        }
        const html = await fetch(link)
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })

        const $ = cheerio.load(html);

        return {
            statusCode: 200,
            data: JSON.stringify({
                name: $(".vmn-title").find("h1").text(),
                downloadLink: $(".vmn-buttons")
                    .children()
                    .last()
                    .attr("href")
            })
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        }
    }
}