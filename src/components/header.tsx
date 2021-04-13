import React, { useState } from "react";
import "../styles/global.css";
import { useNavigate } from "@reach/router";
import Logo from "../images/logo3.ico";

export default function Header() {
  const [selected, setSelected] = useState("anime");
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  return (
    <>
      {/* Originally Mirrored from haintheme.com/demo/html/bustter/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 03 Jun 2019 15:14:19 GMT */}
      {/* preloading */}
      <div id="preloader">
        <img className="logo" src={Logo} alt="" width="119" height="58" />

        <div className="text-center" style={{ color: '#fff', marginTop: '60px' }}>
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
              ><img className="logo" src="images/logo3.ico" alt="logo" />
                <span
                  className="whoosh"
                  style={{
                    fontFamily: "'Dosis', sans-serif",
                    fontSize: "36px",
                    color: '#ffffff',
                    fontWeight: 700,
                    display: 'none',
                    textTransform: 'none'
                  }}
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
                  <a href="#page-top" />
                </li>

                <li>
                  <a
                    className="animelist"
                    href="https://www.gogoanime1.com/home/anime-list"
                    style={{ fontSize: "13px" }}
                    onClick={e => {
                      var link = e.target.href;
                      e.preventDefault();
                      navigate('animelist?url=' + link, { replace: true });
                      // document.location.href = 'animelist?url=' + link;
                    }}
                  >
                    Anime List
                </a>
                </li>
                <li>
                  <a
                    className="latestManga"
                    href="loadlatest"
                    style={{ fontSize: '13px' }}
                  >
                    Latest Manga
                </a>
                </li>

              </ul>
            </div>
          </nav>

          <div className="top-search">
            <select
              id="selector-val"
              defaultValue="anime"
              onChange={e => setSelected(e.target.value)}
            >
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
            </select>
            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={`Search for an ${selected === 'anime' ? "Anime" : "Manga"}, that you would like to search`}
              onKeyUp={e => {
                e.preventDefault();
                let url = '';
                if (selected === 'anime') {
                  url = 'search';
                  if (searchTerm !== '') {
                    fetch(url, {
                      body: JSON.stringify({
                        q: searchTerm
                      })
                    })
                      .then(res => res.json())
                      .then(({ data }) => {
                        setShowResults(true);
                        setResults(data);
                      })
                  }
                  else {
                    setShowResults(false);
                  }
                }
                else {
                  url = 'search/mangasearch';
                  if (searchTerm != '') {
                    fetch(url, {
                      body: JSON.stringify({ q: searchTerm })
                    })
                      .then(res => res.json())
                      .then(data => {
                        setShowResults(true);
                        setResults(data);
                      })
                  }
                  else {
                    setShowResults(false);
                  }
                }
              }}
            />
          </div>
          <div
            id="search_result"
            style={{
              display: showResults ? 'block' : 'none',
              zIndex: 100000,
              padding: '20px',
              overflowY: 'auto',
              overflowX: 'hidden',
              color: '#fff',
              background: '#233a50',
              maxHeight: '400px',
              border: "4px solid #020d18"
            }}
          >
            <ul style={{ overflow: 'hidden' }}>
              {
                (selected === 'anime') ?
                  results.map((data, i) => (
                    <li key={i}>
                      <a
                        className="latestlink"
                        style={{
                          color: '#fff',
                          fontFamily: "'Dosis', sans-serif",
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          cursor: 'pointer'
                        }}
                        href={`loadpage?url=https://www.gogoanime1.com/watch/${data.seo_name}`}
                      >
                        {data.name}
                      </a>
                    </li>
                  ))
                  : results.map((data, i) => (
                    <li key={i}>
                      <img
                        src={data.thumb}
                        style={{
                          position: 'relative',
                          top: '5px',
                          width: '40px',
                          height: '56px',
                          marginRight: '10px',
                          display: 'inline-block'
                        }}
                      />
                      <div style={{ display: 'inline' }}>
                        <a
                          className="manga"
                          style={{
                            position: 'relative',
                            top: '-15px',
                            color: '#fff',
                            fontFamily: 'Dosis, sans-serif',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            cursor: 'pointer'
                          }}
                          href={`loadmanga?url=${data.link}`}
                        >
                          {data.link.replace("https://mangapark.net/manga/", "")}
                        </a>
                      </div>
                    </li>)
                  )
              }
            </ul>
          </div>
        </div>
      </header>

    </>
  )
}