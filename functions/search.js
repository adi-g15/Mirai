const Search = require("./search/index");
const MangaSearch = require("./search/mangasearch");

exports.handler = async (event, context) => {
    const subPath = event.url.split('/')[3] || "";
    if(subPath === "") {
        return Search.handler(event, context);
    } else if (subPath === "mangasearch") {
        return MangaSearch.handler(event, context);
    } else {
        return {
            statusCode: 404
        }
    }
}
