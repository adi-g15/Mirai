import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function ViewManga({ url }) {  // TODO - Earlier passed using req.query.param
  url = url || ""
  const [images, setImages] = useState([]);
  const [details, setInfo] = useState({ name: '', back: '', next: '' });

  useEffect(() => {
    try {
      fetch("/api/mangapark/getImageList?url=" + url)
        .then(res => {
          if (res.ok) { // res.status >= 200 && res.status < 300
            return res.json();
          } else {
            throw Error("Failed getting ImageList; Response Code: " + res.status)
          }
        })
        .then(({ images }) => setImages(images))
        .catch(err => {
          console.error(err);
        })

      fetch("/api/mangapark/getChapterInfo?url=" + url)
        .then(res => {
          if (res.ok) { // res.status >= 200 && res.status < 300
            return res.json();
          } else {
            throw Error("Failed getting ChapterInfo; Response Code: " + res.status)
          }
        })
        .then(information => setInfo(information))
        .catch(err => {
          console.error(err);
        })
    }
    catch (err) {
      console.log(err);
    }
  });

  {/* 
    <style>
        /**NOT IN USE IT SEEMS /
        #info {
            height: 60px;
            position: fixed;
            bottom: 0%;
            width: 100%;
            background-color: #020d18;
            opacity: 1;
            text-align: center;
        }
    </style>
            */}


            // TODO - SEE THAT THIS PAGE ACTUALLY CALLS ITSELF, IN NEXT PAGE AND PREV PAGE BUTTONS (this was such in the original version), implement next and prev natively to react
  return (
    <>
      <Header />

      <div className="hero common-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-ct" style={{ paddingBottom: '20px' }}>
                <h1>
                  {details.name}
                </h1>
              </div>
              {
                (details.back) && (
                  <a
                    href={`viewmanga?url=${details.back}`}
                    className="item item-1 redbtn"
                  >
                    <i className="fa fa-angle-double-left" />
                                  Previous Chapter
                  </a>)
              }
              {
                (details.next) && (
                  <a
                    href={`viewmanga?url=${details.next}`}
                    className="item item-1 yellowbtn"
                  >
                    Next Chapter
                    <i className="fa fa-angle-double-right" />
                  </a>)
              }
            </div>
          </div>
        </div>
      </div>
      {/* <!-- blog detail section--> */}
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="blog-detail-ct" style={{ textAlign: 'center' }}>
                <ul id="images">
                  {
                    images.map((link, i) => (
                      <li key={i}><img src={link} /></li>
                    ))
                  }
                </ul>
                {
                  (details.back) && (<a href={`viewmanga?url=${details.back}`} className="item item-1 redbtn"><i
                    className="fa fa-angle-double-left" /> Previous Chapter</a>)
                }
                {
                  (details.next) && (<a href={`viewmanga?url=${details.next}`} className="item item-1 yellowbtn"> Next Chapter
                    <i className="fa fa-angle-double-right" /></a>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
}