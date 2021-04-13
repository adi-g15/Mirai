const { handler } = require("../mangapark/search")

exports.handler = async (event, context) => {
    return handler({
        ...event,
        maxItem: 10,
        title: event.queryStringParameters['q']
    }, context);
}
