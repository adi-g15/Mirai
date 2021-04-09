const { default: fetch } = require("node-fetch");

exports.handler = async (event, context) => {
    const { url } = event.queryStringParameters;
    const episodeList = [];

    if (!url) {
        return {
            statusCode: 400,
            body: "url query parameter not found"
        };
    }

    try {
        //generate series URL by exploding
        const split = url.split("/");
        const seriesUrl = split[0] + "//" + split[2] + "/" + split[3] + "/" + split[4];

        let html = await fetch(seriesUrl)
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })

        const $ = cheerio.load(html);
        //Get episodes list and links
        let episodeDiv = $(".ci-contents").last(".check-list");
        episodeDiv.find("li").each((_, el) => {
            let link = {};
            link.href = $(el).find("a").attr("href");
            link.episode = $(el).find("a").text();
            episodeList.push(link);
        });
        episodeList = episodeList.reverse();


        //request current episode data
        html = await fetch(url)
            .then(response => {
                if (response.ok) {   // response.status >= 200 & < 300
                    return response.text();
                } else {
                    throw Error(response.statusText);
                }
            })
        const $ = cheerio.load(html);

        const episodeDetails = {
            name: $(".vmn-title").find("h1").text(),
            downloadLink: $(".vmn-buttons")
                .children()
                .last()
                .attr("href")
        };

        return {
            statusCode: 200,
            body: JSON.stringify({
                episodeDetails,
                episodeList,
                seriesUrl
            })
        }
    } catch (err) {

    }

};
