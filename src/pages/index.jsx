import React, { useState, useRef } from "react";
import Helmet from "react-helmet";
import Header from '../components/header';
import Footer from '../components/footer';

export default function HomePage() {
  const [popularList, setPopularList] = useState([]);

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



      <Footer />
    </>
  );
}
