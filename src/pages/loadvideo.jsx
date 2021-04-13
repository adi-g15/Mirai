import React, { useEffect, useState } from "react";
import { getSearchParams } from "gatsby-query-params";
import Header from "../components/header";
import Footer from "../components/footer";
import videojs from "video.js";
import "../styles/player.css"

export default function LoadVideo({ url }) {
  const [episodeDetails, setEpisodeDetails] = useState({});
  const [episodeList, setEpisodeList] = useState([])
  const [seriesUrl, setSeriesUrl] = useState('');
  const [navList, setNavList] = useState([]);

  url = url ?? getSearchParams()['url'];

  useEffect(() => {
    //request Episode List
    fetch('/api/get-series')
      .then(res => res.json())
      .then(data => {
        const {
          episodeDetails,
          episodeList,
          seriesUrl
        } = data;

        setEpisodeDetails(episodeDetails);
        setEpisodeList(episodeList);
        setSeriesUrl(seriesUrl);
      })
      .catch(err => {
        console.error(err);
      })

    // Fetch Gogoanime latest header links
    fetch('/api/nav-list')
      .then(res => res.json())
      .then(data => {
        const navList = data;
        setNavList(navList);
      })
      .catch(err => {
        console.error(err);
      })

    // $(document).ready(function () {
    document.querySelector('.episodeDiv').addEventListener('click', e => {
      var link = e.target.getAttribute('link');
      e.preventDefault();
      fetch(`/api/loadvideo/getVideoUrl?link=${link}`)
        .then(res => res.json())
        .then(data => {
          const { name, downloadLink } = data;
          document.querySelector('.title-update').innerHTML = name;
          document.querySelector('.download-update').setAttribute('href', downloadLink);

          const player = videojs('my-video');
          player.pause();
          player.src([{ type: "video/mp4", src: downloadLink }]);
          player.load();
          player.play();
        })
        .catch(err => {
          console.error(err);
        })
    });
    // });
  })

  return (
    <>
      <Header />

      <div className="slider movie-items">
        <div className="container">
          <div className="row">
          </div>
        </div>
      </div>

      <div className="trailers">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">
              <div className="title-hd">
                <h2 className="title-update">
                  {episodeDetails.name}
                </h2>
              </div>
              <div className="videos">
                <div className="slider-for-2 video-ft">
                  <div className="container item-video">
                    <video id='my-video' className='video-js' controls preload='auto' data-setup='{}'>
                      <source src={episodeDetails.downloadLink} type='video/mp4' />
                      <p className='vjs-no-js'>
                        To view this video please enable JavaScript, and consider upgrading to a web browser that
                                                <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
                      </p>
                    </video>

                    <a href={episodeDetails.downloadLink} target="_blank" className="item item-1 redbtn download-update"
                      style={{marginTop:'20px',display:'inline-block', padding:'10px'}} download> <i className="fa fa-download"></i>
                                        Download Episode</a>

                  </div>
                </div>
                <div className="slider-nav-2 thumb-ft">
                  {
                    episodeList.map((item, i) => {
                      return (
                        <div key={i} class={item.href === url ? "item episodeDiv slick-current slick-active" : "item episodeDiv"} link={item.href}>
                          <div className="trailer-img">
                            <img src="images/uploads/play-vd.png" alt="play-video" style={{ width:'40px'}} />
                          </div>
                          <div className="trailer-infor">
                            <h4 className="desc">
                              {item.episode}
                            </h4>
                            <p>Click to play</p>
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


      <div className="latestnew" style={{paddingTop: '20px'}}>
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">
              <div className="title-hd">
                <h2>About US</h2>
              </div>
              <div className="tabs">
                <ul className="tab-links-3">
                  <li className="active"><a href="#tab31">#INFO </a></li>
                </ul>
                <div className="tab-content">
                  <div id="tab31" className="tab active">
                    <div className="row">
                      <div className="blog-item-style-1">
                        <img src="images/pfp.jpg" alt="" style={{ width: '190px', height:'190px'}} />
                        <div className="blog-it-infor">
                          <h3><a href="#">Project Sakura</a></h3>
                          <span className="time">Delhi, India</span>
                          <p>Sakura provides quick timely updates and more customizations with the same stability as
                          Lineage OS.<i className="fa fa-thumbs-up"></i> If you'd like to donate, please follow here!</p>
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
                          <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning
                          Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for
                          the presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben
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
                          <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning
                          Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for
                          the presidency of the United States. Amazon bought it in a pitch package deal. <span> Ben
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
  );
}
