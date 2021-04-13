import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function AnimeList(props) {    // this `props.url` was earlier passed in 'req.query.url'
  const [series, setSeries] = useState([]);
  const [url, setUrl] = useState(props.url || "https://www.gogoanime1.com/home/anime-list");

  useEffect(() => {
    let series = [];
    fetch("/api/animelist?url=" + url)
      .then(res => {
        if (res.ok) {   // response.status >= 200 & < 300
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(series_data => setSeries(series_data))
      .catch(err => {
        console.error(err);
      });
  })

  return (
    <>
      <Header />

      <div className="hero common-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-ct">
                <h1>Anime List</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-single">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="topbar-filter">
                <p className="pad-change">Found <span>
                  {series.length} categories
            </span> in total</p>
                <label>Sorted by: Alphabetical Order</label>
              </div>
              <div className="row">
                {
                  series.map(item => {
                    {
                      item.links.map(x => (
                        <div className="col-md-12">
                          <div className="ceb-item-style-2">
                            <div className="ceb-infor">
                              <h2><a className="latestlink" href="<%= x.href%>">
                                {x.text}
                              </a></h2>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  })
                }
              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="latestnew">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">

              <div className="title-hd">
                <h2>About US</h2>
              </div>
              <div className="tabs">
                <ul className="tab-links-3">
                  <li className="active"><a href="#tab31">#Movies </a></li>
                  <li><a href="#tab32"> #TV Shows </a></li>
                  <li><a href="#tab33"> # Celebs</a></li>
                </ul>
                <div className="tab-content">
                  <div id="tab31" className="tab active">
                    <div className="row">
                      <div className="blog-item-style-1">
                        <img src="images/pfp.jpg" alt="" style={{width: '190px', height: '190px'}} />
                          <div className="blog-it-infor">
                            <h3><a href="#">Project Sakura</a></h3>
                            <span className="time">Delhi, India</span>
                            <p>Sakura provides quick timely updates and more customizations with the same stability as Lineage
                      OS.<i className="fa fa-thumbs-up"></i> If you'd like to donate, please follow here!</p>
                          </div>
                </div>
                      </div>
                    </div>
                    <div id="tab32" className="tab">
                      <div className="row">
                        <div className="blog-item-style-1">
                          <img src="images/uploads/blog-it2.jpg" alt="" width="170" height="250" />
                            <div className="blog-it-infor">
                              <h3><a href="#">Tab 2</a></h3>
                              <span className="time">13 hours ago</span>
                              <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room
                      star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the
                      presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben
                        Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                            </div>
                </div>
                        </div>
                      </div>
                      <div id="tab33" className="tab">
                        <div className="row">
                          <div className="blog-item-style-1">
                            <img src="images/uploads/blog-it1.jpg" alt="" width="170" height="250" />
                              <div className="blog-it-infor">
                                <h3><a href="#">Tab 3</a></h3>
                                <span className="time">13 hours ago</span>
                                <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room
                      star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the
                      presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben
                        Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                              </div>
                </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


            <Footer />
    </>
    // animelist, title="Mirai", series = ""
  );
}