import React, { useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/load-episodes.css"

// from loadepisode.ejs, but on /loadpage route
export default function LoadPage() {
  const [navList, setNavList] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState({ name: '', details: '', detailHtml: '', image: '', started: '', });
  const [detailer, setDetailer] = useState([]);

  useRef(() => {
    document.getElementById("startwatching").addEventListener('click', (e) => {
      e.preventDefault();
      // TODO: loadvideo is now a react component, instead of passing this ?url as query parameter, later use <Link> and pass this as props to the component
      document.location.href = `loadvideo?url=${lastep}`;
    });

    fetch('/api/nav-list')
      .then(res => res.json())
      .then(data => {
        const navList = data;
        setNavList(navList);
      })
      .catch(err => {
        console.error(err);
      })
  });

  let i = 0;
  let lastep = '';

  return (
    <>
      <Header />

      <div className="hero mv-single-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            </div>
          </div>
        </div>
      </div>

      <div className="page-single movie-single movie_single">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="movie-img sticky-sb">
                <img src={seriesDetails.image} alt="" />
              </div>
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="movie-single-ct main-content">
                <h1 className="bd-hd">
                  {seriesDetails.name}<br /><span>
                    {seriesDetails.started}
                  </span>
                </h1>
                <div className="social-btn">
                  <a href="#" className="parent-btn" id="startwatching"><i className="ion-play"></i> Start Watching</a>
                </div>
                <div className="movie-tabs">
                  <div className="tabs">
                    <ul className="tab-links tabs-mv">
                      <li className="active"><a href="#overview">Overview</a></li>
                      <li><a href="#cast"> Episodes </a></li>
                      <li><a href="#details"> Details </a></li>
                    </ul>
                    <div className="tab-content">
                      <div id="overview" className="tab active">
                        <div className="row">
                          <div className="col-md-8 col-sm-12 col-xs-12">
                            <p>
                              {seriesDetails.details}
                            </p>
                            {seriesDetails.detailHtml}
                          </div>
                        </div>
                      </div>

                      <div id="cast" className="tab">
                        <div className="row">
                          <h2>Episode List</h2>
                          <div className="title-hd-sm">
                            <h4>Latest Updates</h4>
                          </div>
                          <div className="mvcast-item">
                            {
                              episodeList.map((item, i) => {
                                i++;
                                lastep = item.href;
                                return (
                                  <>
                                    <div className="cast-it">
                                      <div className="cast-left">
                                        <a className="fetchVedio" href={item.href}>
                                          {item.episode}
                                        </a>
                                      </div>
                                    </div>
                                    {
                                      (i === 5) && (
                                        <div className="title-hd-sm">
                                          <h4>All Episodes</h4>
                                        </div>)
                                    }
                                  </>)
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div id="details" className="tab">
                        <div className="row">
                          <div className="Mirai">
                            <div className="mvcast-item">
                              {
                                detailer.map((item, i) => {
                                  const x = item.value.split(":");
                                  return (
                                    <div className="cast-it" key={i}>
                                      <div className="cast-left">
                                        <a className="fetchVedio" href="#"><span style={{ color: '#dcf836' }}>
                                          {item.name}
                                        </span><span style={{ color: '#dd003f' }} >
                                            {x['1']}
                                          </span></a>
                                      </div>
                                    </div>)
                                })
                              }
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
        </div>
      </div>








      <Footer />
    </>
  );
}
