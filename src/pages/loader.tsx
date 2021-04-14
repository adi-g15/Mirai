import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Loader({link}) {    // TODO- Originally passed as req.body.link
    const [latest, setLatest] = useState([]);
    const [total, setTotal] = useState(0);
    const [links, setLinks] = useState([]);
    useEffect(() => {
        fetch("/api/loader?url=" + link)
        .then(res => {
            if (res.ok) {   // response.status >= 200 & < 300
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        })
        .then(data => {
            const {latest, total, links} = data;

            setLatest(latest);
            setTotal(total);
            setLinks(links);
        })
        .catch(err => {
            console.error(err);
        })
    });


    return (
        <>
      <Header />
      <div className="hero common-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-ct">
                <h1>Latest Manga</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              {
                latest.map((item, i) => (
                  <div className="blog-item-style-1 blog-item-style-3" key={i}>
                    <img
                      src="<%= item.imageLink %>"
                      alt=""
                      style={{ width: '60px !important' }}
                    />
                    <div className="blog-it-infor">
                      <h3>
                        <a className="manga" href="<%= item.mangaLink %>"
                        >{item.title}
                        </a>
                      </h3>
                    </div>
                  </div>
                ))
              }
            </div>
            <form id="mahi" action="loader" method="post">
              <input type="hidden" name="link" id="linker" />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
    )
}