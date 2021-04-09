exports.handler = async (event, context) => {
    const { url } = event.queryStringParameters;
    const episodeList = [];
    const detailer = [];

    try {
        if(!url) {
            return {
                statusCode: 400,
                body: "A `url` query parameter required"
            }
        }

        const html = await fetch(url)
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })

        const $ = cheerio.load(html);
        //Get series details
        let seriesDetails = {
            name: $(".anime-title").text(),
            details: $(".anime-details").text(),
            image: $(".animeDetail-image").find("img").attr("src"),
            started: $(".animeDetail-tags").children().last().text()
        };
        $(".animeDetail-tags .animeDetail-item").each((i, el) => {
            let detailsx = {};
            detailsx.name = $(el).find("span").text();
            detailsx.value = $(el).text();
            detailer.push(detailsx);
        });
        //Get episodes list and links
        let episodeDiv = $(".tnContent").attr("style", "display: none;");
        episodeDiv.find("li").each((i, el) => {
            let link = {};
            link.href = $(el).find("a").attr("href");
            link.episode = $(el).find("a").text();
            episodeList.push(link);
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                seriesDetails,
                detailer,
                episodeList
            })
        }
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        }
    }
}
