const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    const {q: query} = event.queryStringParameters;
    try {
        const data = await fetch("https://www.gogoanime1.com/search/topSearch?q=" + query)
                            .then(res => res.json())

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        console.error(err);

        return {
            statusCode: 500
        };
    }
}
