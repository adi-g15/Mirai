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
        url = url.substring(0, url.lastIndexOf("/"));
        let html = await fetch(url)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    return res.text();
                } else {
                    throw Error("Response Code: " + res.status)
                }
            });

        html = html.substring(html.indexOf("_load_pages"));
        html = html.substring(html.indexOf("["), html.indexOf(";"));
        let arr = eval(html);
        const img = [];
        for (let i of arr) {
            img.push(i.u);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ images: img })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500
        };
    }
}
