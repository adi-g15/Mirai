import React, { useState, useRef, useEffect } from "react";
import Helmet from "react-helmet";
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from "@reach/router";

export default function HomePage() {
  const [popularList, setPopularList] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [newAnimeList, setNewAnimeList] = useState([]);
  const [navList, setNavList] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  const [mangaUpdateList, setMangaUpdateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // CORS NEEDS TO BE HANDLED BY SERVER SIDE, SO WE NEED OUR SERVER
    // Fetch Gogoanime popular anime links
    fetch("/api/popular-anime")
      .then(res => res.json())
      .then(data => {
        console.log("received data");
        console.log(data);
        setPopularList(data);
      }).catch(err => {
        console.error(err);
      })

    // Fetch Gogoanime latest up[date] links
    fetch("/api/updated-links")
      .then(res => res.json())
      .then(data => {
        console.debug("Loaded UpdatedLinks");
        const {
          navList,
          updateList,
          newAnimeList
        } = data;

        setNavList(navList);
        setUpdateList(updateList);
        setNewAnimeList(newAnimeList);
      })
      .catch(err => {
        console.error(err);
      })

    // Fetch ongoing anime list
    fetch("/api/on-going")
      .then(res => res.json())
      .then(list => {
        setOngoingList(list)
      })
      .catch(err => {
        console.error(err);
      })

    fetch("/api/mangapark/getMangaList?pageNo=1")
      .then(res => res.json())
      .then(data => {
        setMangaUpdateList(data.LatestManga);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="author" content="Project Sakura" />
          <meta name="description" content="An Anime Streaming Website" />
          <meta name="theme-color" content="#020d18" />
          <meta name="lang" content="en" />
          <link rel="profile" href="#" />

          {/* Favicon */}
          <link rel="shortcut icon" href="images/favicon/favicon.ico" />

          {/* Mobile specific meta */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="format-detection" content="telephone-no" />

          <title>Mirai</title>
        </Helmet>
      </div>
      <Header />

      <div className="slider sliderv2">
        <div className="container" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="row">
            <div className="slider-single-item">
              {
                popularList.map((item, index) => {
                  const picture = item.picture.split('https://');
                  const picture2 = picture[1].split("')");

                  let i = 0;
                  let color = 'blue';
                  return (
                    <div className="movie-item" key={index}>
                      <div className="row">
                        <div className="col-md-8 col-sm-12 col-xs-12">
                          <div className="title-in">
                            <div className="cate">
                              {
                                // @todo - This loop will always create the same elements, i believe, check later
                                item.genre.map((gen, i) => {
                                  if (i == 1) { color = 'yell'; }
                                  if (i % 2 == 0) { color = 'orange'; }
                                  if (i % 3 == 0) { color = 'blue'; }
                                  if (i == 4) { color = 'yell'; }
                                  if (i % 5 == 0) { color = 'green'; }

                                  i++;

                                  return (
                                    <span class={color} key={i}>
                                      <a href="#">
                                        {gen}
                                      </a>
                                    </span>);
                                })
                              }
                            </div>
                            <h1><a className="latestlink" href={item.link}>
                              {item.name}
                            </a></h1>
                            <div className="social-btn" style={{ marginTop: '15px' }}>
                              <a href={item.link} className="parent-btn latestlink">
                                <i className="ion-play"></i>
                                Start Watching
                                Now
                              </a>
                            </div>

                            <div className="btn-transform transform-vertical" style={{ paddingTop: '15px' }}>
                              <div><a href={item.link} className="item item-1 redbtn latestlink" tabindex="0">Popular</a>
                              </div>
                              <div><a href={item.link} className="item item-2 redbtn hvrbtn latestlink" tabindex="0">Watch</a>
                              </div>
                            </div>


                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                          <div className="mv-img-2">
                            <a href="#">
                              <img src={`https://${picture2[0]}`} alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>


      <div className="slider movie-items">
        <div className="container">
          <div className="row">
            <div className="title-hd okokok" style={{ marginTop: '30px' }}>
              <h2>Latest Updates</h2>
            </div>
            {/*
          <div className="social-link">
            <p>Follow us: </p>
            <a href="#"><i className="ion-social-facebook"></i></a>
            <a href="#"><i className="ion-social-twitter"></i></a>
            <a href="#"><i className="ion-social-googleplus"></i></a>
            <a href="#"><i className="ion-social-youtube"></i></a>
          </div>
          */}
            <div className="slick-multiItemSlider">
              {
                updateList.map((item, i) => {
                  return (
                    <div className="movie-item" key={i}>
                      <div className="mv-img">
                        <a href="#">
                          <img src={item.imageLink} style={{ width: '300px', height: '400px' }} />
                        </a>
                      </div>
                      <div className="title-in">
                        <div className="cate">
                          <span className="blue">
                            <a href="#">
                              {item.epUpdate}
                            </a>
                          </span>
                        </div>
                        <h6>
                          <a href={item.mainLink} className="latestlink"
                            style={{
                              fontSize: '16px',
                              height: '50px',
                              display: 'block',
                              fontWeight: 'bold',
                              textAlign: 'left'
                            }}>
                            {item.epName}
                          </a>
                        </h6>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="row">
            <div className="title-hd okokok" style={{ marginTop: '30px' }}>
              <h2>Ongoing Anime</h2>
            </div>
            {/* <div className="social-link">
            <p>Follow us: </p>
            <a href="#"><i className="ion-social-facebook"></i></a>
            <a href="#"><i className="ion-social-twitter"></i></a>
            <a href="#"><i className="ion-social-googleplus"></i></a>
            <a href="#"><i className="ion-social-youtube"></i></a>
          </div> */}
            <div className="slick-multiItemSlider ongoing">
              {
                ongoingList.map((item, index) => {
                  let i = 0, color = 'blue';

                  return (
                    <div className="movie-item" key={index}>
                      <div className="mv-img">
                        <a href="#">
                          <img src={item.imageLink} style={{ width: '300px', height: '400px' }} />
                        </a>
                      </div>
                      <div className="title-in">
                        {
                          item.genre.map((gen, i) => {
                            if (i == 1) { color = 'yell'; }
                            if (i % 2 == 0) { color = 'orange'; }
                            if (i % 3 == 0) { color = 'blue'; }
                            if (i == 4) { color = 'yell'; }
                            if (i % 5 == 0) { color = 'green'; }

                            ++i;
                            return (
                              <div className="cate" key={i}>
                                <span className={color} style={{ color: '#fff', fontWeight: '600', fontSize: '10px' }}>
                                  {gen}
                                </span>
                              </div>
                            );
                          })
                        }
                        <h6>
                          <a
                            href={item.mainLink}
                            className="latestlink"
                            style={{ fontSize: '16px', height: '50px', display: 'block', fontWeight: 'bold', textAlign: 'left' }}
                          >
                            {item.title}
                          </a>
                        </h6>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>

        </div>
      </div>




      <div className="movie-items" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">
              <div className="title-hd oolla">
                <h2>Latest Manga Releases</h2>
              </div>
              <div className="tabs oolla">
                <ul className="tab-links">
                  <li className="active">
                    <a href="#tab1">#MANGA</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="tab1" className="tab active">
                    <div className="row">
                      <div className="slick-multiItem">
                        {
                          mangaUpdateList.map((item, i) => {
                            return (
                              <div className="slide-it" key={i}>
                                <div className="movie-item">
                                  <div className="mv-img">
                                    <img src={item.imageLink} alt="" style={{ width: '200px', height: '270px' }} />
                                  </div>
                                  <div className="hvr-inner">
                                    <a
                                      className="manga"
                                      href={item.mangaLink}
                                      onClick={e => {
                                        const link = e.target.href;
                                        e.preventDefault();
                                        navigate(`loadmanga?url=${link}`, { replace: true });
                                        // document.location.href = 'loadmanga?url=' + link;
                                      }}
                                    >
                                      Read Now<i className="ion-android-arrow-dropright"></i>
                                    </a>
                                  </div>
                                  <div className="title-in">
                                    <h6>
                                      <a
                                        className="manga"
                                        href={item.mangaLink}
                                        style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'left' }}
                                        onClick={e => {
                                          var link = e.target.href;
                                          e.preventDefault();
                                          navigate(`loadmanga?url=${link}`, { replace: true });
                                          // document.location.href = 'loadmanga?url=' + link;
                                        }}
                                      >
                                        {item.mangaName}
                                      </a>
                                    </h6>
                                    <p style={{ lineHeight: '0px', paddingTop: '5px' }}>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="title-hd">
                <h2>New Anime</h2>
              </div>
              <div className="tabs oolla">
                <ul className="tab-links-2">
                  <li className="active"><a href="#tab21">#ARRIVAL</a></li>
                </ul>
                <div className="tab-content">
                  <div id="tab21" className="tab active ">
                    <div className="row">
                      <div className="slick-multiItem">
                        {
                          newAnimeList.map((item, i) => {
                            return (
                              <div className="slide-it" key={i}>
                                <div className="movie-item">
                                  <div className="mv-img">
                                    <img src={item.imageLink} alt="" style={{ width: '200px', height: '270px' }} />
                                  </div>
                                  <div className="hvr-inner">
                                    <a className="latestlink" href={item.animeLink}>
                                      Read more <i className="ion-android-arrow-dropright"></i>
                                    </a>
                                  </div>
                                  <div className="title-in">
                                    <h6><a className="latestlink" href={item.animeLink}
                                      style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'left' }}>
                                      {item.animeTitle}
                                    </a></h6>
                                    <p style={{ lineHeight: '0px', paddingTop: '5px' }}>
                                      {
                                        item.genre.map((value, i) => {
                                          return (<p key={i}>{value}</p>);
                                        })
                                      }
                                    </p>
                                  </div>
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




      <div className="latestnew">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">
              <div className="title-hd okokok">
                <h2>About US</h2>
              </div>
              <div className="tabs">
                {/* <ul className="tab-links-3">
          <li className="active"><a href="#tab31">#INFO </a></li>               
        </ul> */}
                <div className="tab-content">
                  <div id="tab31" className="tab active">
                    <div className="row">
                      <div className="blog-item-style-1">
                        <img src="images/pfp.jpg" alt="" style={{ width: '190px', height: '190px' }} />
                        <div className="blog-it-infor">
                          <h3><a href="#">Project Sakura</a></h3>
                          <span className="time">Delhi, India</span>
                          <p>
                            Sakura provides quick timely updates and more customizations with the same stability as Lineage OS.
                              <i className="fa fa-thumbs-up"></i>
                              If you'd like to donate, please follow here!
                            </p>
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
