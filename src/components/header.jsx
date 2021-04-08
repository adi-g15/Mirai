import React from "react";
import "../styles/global.css";

export default function Header() {
  return (
    <>
      {/* Originally Mirrored from haintheme.com/demo/html/bustter/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 03 Jun 2019 15:14:19 GMT */}
      {/* preloading */}
      <div id="preloader">
        <img className="logo" src="images/logo3.ico" alt="" width="119" height="58" />

        <div className="text-center" style="color: #fff; margin-top: 60px">
          <h1>Mirai</h1>
        </div>
      </div>

      <header className="ht-header">
        <div className="container">
          <nav className="navbar navbar-default navbar-custom">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header logo">
              <div
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <div id="nav-icon1">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <a href="/"
              ><img className="logo" src="images/logo3.ico" />
                <span
                  className="whoosh"
                  style="
                  font-family: 'Dosis', sans-serif;
                  font-size: 36px;
                  color: #ffffff;
                  font-weight: 700;
                  display: none;
                  text-transform: none;
                "
                >Mirai</span
                ></a
              >
            </div>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div
              className="collapse navbar-collapse flex-parent"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav flex-child-menu menu-left">
                <li className="hidden">
                  <a href="#page-top"></a>
                </li>

                <li>
                  <a
                    className="animelist"
                    link="https://www.gogoanime1.com/home/anime-list"
                    style="font-size: 13px"
                  >
                    Anime List
                </a>
                </li>
                <li>
                  <a
                    className="latestManga"
                    href="loadlatest"
                    style="font-size: 13px"
                  >
                    Latest Manga
                </a>
                </li>

              </ul>
            </div>
          </nav>

          <div className="top-search">
            <select id="selector-val">
              <option value="anime" selected>Anime</option>
              <option value="manga">Manga</option>
            </select>
            <input
              type="text"
              id="searchInput"
              placeholder="Search for an Anime, that you would like to search"
            />
          </div>
          <div
            id="search_result"
            style="
            display: none;
            z-index: 100000;
            padding: 20px;
            overflow-y: auto;
            overflow-x: hidden;
            color: #fff;
            background: #233a50;
            max-height: 400px;
            border: 4px solid #020d18;
          "
          >
            <ul style="overflow: hidden"></ul>
          </div>
        </div>
      </header>

    </>
  )
}