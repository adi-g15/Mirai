const mangaPark = require("../utils/mangapark");
const mangaParkObj = new mangaPark();

const RenderLatestManga = async (req, res, next) => {
};

const RenderLoadManga = async (req, res, next) => {
    try{
        var url = req.query.url;
        const manga = await mangaParkObj.getMangaInfo(url);
        res.render("loadmanga", {
            title: "Mirai",
            mangaDetails: {
                image: manga.mangaInfo.thumb,
                name: manga.mangaInfo.title,
                summary: manga.mangaInfo.desc,
                release: "",
                views: "",
            },

            chapterList: manga.mangaInfo.chapterList,
        });
    }
    catch(err){
        console.log(err);
    }
};

module.exports = {
    RenderLatestManga,
    RenderLoadManga,
    RenderViewManga,
};
