const fetch = require("node-fetch");
const cheerio = require("cheerio");

let navList = [];

// Fetch Gogoanime latest header links
fetch("https://www.gogoanime1.com")
    .then(response => {
        if (response.ok) {   // response.status >= 200 & < 300
            return response.text();
        } else {
            throw Error(response.statusText);
        }
    })
    .then(html => {
        const $ = cheerio.load(html);

        $(".main-menu li").each((i, el) => {
            let link = {};
            link.href = $(el).find("a").attr("href");
            link.text = $(el).find("a").text();
            navList.push(link);
        });
    })
    .catch(err => {
        console.error(err);
    })

const LoaderController = (req, res, next) => {
};

const RenderNewLoader = (req, res, next) => {
    let latestk = [];
    let url = req.body.link;
    fetch(url)
        .then(response => {
            if (response.ok) {   // response.status >= 200 & < 300
                return response.text();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(html => {
            const $ = cheerio.load(html);
            $(".truyen-list .list-truyen-item-wrap").each((j, eld) => {
                let item = {};
                item.mangaLink = $(eld).children().first("a").attr("href");
                item.imageLink = $(eld).find("img").attr("src");
                item.views = $(eld).find(".aye_icon").text();
                item.description = $(eld).find("p").text();
                item.title = $(eld).find("h3 a").text();
                item.update = $(eld).find(".list-story-item-wrap-chapter").text();
                item.updateLink = $(eld)
                    .find(".list-story-item-wrap-chapter")
                    .attr("href");
                latestk.push(item);
            });
            let total = $(".panel_page_number .group_qty").find("a").text();
            let linksk = [];
            $(".panel_page_number .group_page a").each((y, elx) => {
                let link = {};
                link.text = $(elx).text();
                link.href = $(elx).attr("href");
                link.class = $(elx).attr("class");
                linksk.push(link);
            });

            res.render("newloader", {
                title: "Mirai",
                latest: latestk,
                total: total,
                links: linksk,
            });
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(err.status || 500);
        })
};

module.exports = {
    RenderAnimeList,
    LoaderController,
    RenderLoadEpisodes,
    RenderNewLoader
};
