import React, { useEffect } from "react"

export default function Footer() {
  useEffect(() => {
    // NOTE: DEBUG: TODO: After this will give errors, since these elements don't exist
    return
    document.querySelector('.latestlink').onclick = (e) => {
      var link = e.target.href;
      e.preventDefault();
      document.location.href = 'loadpage?url=' + link;
    }

    document.querySelector('.load-hot-manga').addEventListener('click', e => {
      var link = e.target.href;
      e.preventDefault();
      document.getElementById('linker').val(link);
      document.getElementById('mahi').submit();
    });

    document.querySelector('.load-manga').addEventListener('click', e => {
      var link = e.target.href;
      e.preventDefault();
      document.querySelector('#linker').val(link);
      document.querySelector('#mahi').submit();
    });

    document.querySelector('.manga').addEventListener('click', e => {
      var link = e.target.href;
      e.preventDefault();
      document.location.href = 'loadmanga?url=' + link;
    });

    document.querySelector('.viewmangachapter').addEventListener('click', e => {
      var link = e.target.href;
      e.preventDefault();
      document.location.href = 'viewmanga?url=' + link;
    });

    document.querySelector('.fetchVedio').addEventListener('click', e => {
      var link = e.target.href;
      e.preventDefault();
      // TODO: loadvideo is now a react component, instead of passing this ?url as query parameter, later use <Link> and pass this as props to the component
      document.location.href = 'loadvideo?url=' + link;
    });

    document.querySelector('.animelist').addEventListener('click', e => {
      var link = e.target.href;
      e.preventDefault();
      document.location.href = 'animelist?url=' + link;
    });

    document.getElementById('selector-val').addEventListener('change', e => {
      if (e.target.value === 'anime') {
        document.getElementById('searchInput').placeholder = 'Search for an Anime, that you would like to search';
      }
      else {
        document.getElementById('searchInput').placeholder = 'Search for a Manga, that you would like to search';
      }
    });

    document.getElementById('searchInput').addEventListener('keyup', e => {
      const input = e.target.value;
      const selected = document.getElementById('selector-val').value;
      let url = '';
      if (selected === 'anime') {
        url = 'search';
        if (input !== '') {
          let string = '';
          e.preventDefault();
          fetch(url, {
            body: JSON.stringify({
              q: input
            })
          })
            .then(res => res.json())
            .then(({ data }) => {
              const result = document.querySelector('#search_result ul');
              result.innerHTML = '';
              document.getElementById('search_result').style.display = 'block';
              data.forEach(val => {
                const li = document.createElement('li');
                li.innerHTML = `<a
                                class="latestlink"
                                style="color:#fff;font-family: 'Dosis', sans-serif;font-weight: bold;text-transform: uppercase;cursor: pointer;"
                                href="loadpage?url=https://www.gogoanime1.com/watch/${val.seo_name}"
                              >
                                ${val.name}
                              </a>`;
                result.appendChild(li);
              });
            })
        }
        else {
          document.getElementById('search_result').style.display = 'none';
        }
      }
      else {
        url = 'search/mangasearch';
        if (input != '') {
          var string = '';
          e.preventDefault();
          fetch(url, {
            body: JSON.stringify({ q: input })
          })
            .then(res => res.json())
            .then(data => {
              const result = document.querySelector('#search_result ul');
              result.innerHTML = '';
              document.getElementById('search_result').style.display = 'block';
              console.log(data);
              data.forEach((val) => {
                const arr = val.link.replace("https://mangapark.net/manga/", "");
                const li = document.createElement('li');
                li.innerHTML = `<img
                                src="${val.thumb}"
                                style="position:relative;top:5px;width:40px;height:56px;margin-right:10px;display:inline-block;"
                              >
                              <div style="display:inline;">
                                <a
                                  class="manga"
                                  style="position: relative;top: -15px;color:#fff;font-family: 'Dosis', sans-serif;font-weight: bold;text-transform: uppercase;cursor: pointer;"
                                  href="loadmanga?url=${val.link}"
                                >
                                  ${arr}
                                </a>
                              </div>`;
                result.appendChild(li);
              })
            })
        }
        else {
          document.querySelector('#search_result').style.display = 'none';
        }
      }
    });

  }, []);

  return (
    <>
      <footer className="ht-footer">
        <div className="container">

        </div>
        <div className="ft-copyright">
          <div className="ft-left">
            <p>© 2021 Mirai. All Rights Reserved. Designed by Project Sakura.</p>
          </div>
          <div className="backtotop">
            <p><a href="#" id="back-to-top">Back to top <i className="ion-ios-arrow-thin-up"></i></a></p>
          </div>
        </div>
      </footer>

      {/* end of footer section */}
      <script src="javascripts/plugins.js"></script>
      <script src="javascripts/plugins2.js"></script>
      <script src="javascripts/custom.js"></script>
    </>
  );
}