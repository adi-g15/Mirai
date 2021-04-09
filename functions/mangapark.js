const getGenre = require("./mangapark/getGenre");
const getGenreManga = require("./mangapark/getGenreManga");
const getImageList = require("./mangapark/getImageList");
const getLatestChapter = require("./mangapark/getLatestChapter");
const getChapterInfo = require("./mangapark/getChapterInfo")
const getMangaInfo = require("./mangapark/getMangaInfo");
const getMangaList = require("./mangapark/getMangaList");
const search = require("./mangapark/search");

exports.handler = async (event, context) => {
    const subPath = event.path.split('/')[3];
    console.log(event.path);

    if(subPath.startsWith("getGenre")) {
        return await getGenre.handler(event, context);
    } else if(subPath.startsWith("getGenreManga")) {
        return await getGenreManga.handler(event, context);
    } else if(subPath.startsWith("getImageList")) {
        return await getImageList.handler(event, context);
    } else if(subPath.startsWith("getLatestChapter")) {
        return await getLatestChapter.handler(event, context);
    } else if(subPath.startsWith("getMangaInfo")) {
        return await getMangaInfo.handler(event, context);
    } else if(subPath.startsWith("getMangaList")) {
        return await getMangaList.handler(event, context);
    } else if(subPath.startsWith("search")) {
        return await search.handler(event, context);
    } else if(subPath.startsWith("getChapterInfo")) {
        return await getChapterInfo.handler(event, context);
    } else {
        return {
            statusCode: 404
        }
    }

}
