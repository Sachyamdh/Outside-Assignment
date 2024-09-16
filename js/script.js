document.addEventListener("DOMContentLoaded", () => {
    setupSocialIcons();
    setupFooterItems();
    loadYouTubeAPI();
    fetchDummyData();
  });
  
  function setupSocialIcons() {
    const socialIcons = [
      { href: "https://facebook.com", icon: "mdi:facebook", alt: "Facebook" },
      { href: "https://twitter.com", icon: "mdi:twitter", alt: "Twitter" },
      { href: "https://instagram.com", icon: "mdi:instagram", alt: "Instagram" },
      { href: "https://youtube.com", icon: "mdi:youtube", alt: "YouTube" },
      { href: "https://linkedin.com", icon: "mdi:linkedin", alt: "LinkedIn" },
    ];
  
    const socialIconsContainer = document.getElementById("social-icons");
  
    socialIcons.forEach((icon) => {
      const a = document.createElement("a");
      a.href = icon.href;
      a.target = "_blank";
      const span = document.createElement("span");
      span.classList.add("iconify");
      span.setAttribute("data-icon", icon.icon);
      span.setAttribute("data-inline", "false");
      span.setAttribute("alt", icon.alt);
      a.appendChild(span);
      socialIconsContainer.appendChild(a);
    });
  }
  
  function setupFooterItems() {
    const footerItems = [
      ["About", "Impact", "Our Approach", "Programs"],
      ["Resources", "Get Involved", "Financials", "Careers", "Contact"],
    ];
  
    const footerItemsContainer = document.getElementById("footer-items");
  
    footerItems.forEach((group) => {
      const div = document.createElement("div");
      div.classList.add("item-holder");
  
      group.forEach((item) => {
        const span = document.createElement("span");
        span.textContent = item;
        div.appendChild(span);
      });
  
      footerItemsContainer.appendChild(div);
    });
  }
  
  function loadYouTubeAPI() {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onload = () => {
      window.onYouTubeIframeAPIReady = function () {
        const iframes = document.querySelectorAll("iframe");
        let players = [];
  
        iframes.forEach((iframe, index) => {
          try {
            const player = new YT.Player(iframe, {
              events: {
                onStateChange: function (event) {
                  if (event.data === YT.PlayerState.PLAYING) {
                    players.forEach((p) => {
                      if (p !== player) {
                        p.pauseVideo();
                      }
                    });
                  }
                },
              },
            });
            players.push(player);
          } catch (error) {
            console.error("Error initializing YouTube player:", error);
          }
        });
      };
    };
    document.body.appendChild(script);
  
    window.addEventListener("load", () => {
      if (typeof YT === "undefined" || !YT.Player) {
        console.warn("YouTube API not loaded correctly.");
      }
    });
  }
  
  async function fetchDummyData() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      console.log(data);
  
      const articles = document.querySelectorAll(".article-grid-articles");
      const heroContent = document.querySelector(".hero-content");
      const secondContent = document.querySelector(".info-div");
  
      const randomNumber1 = getRandomNumber(0, 99);
      const randomNumber2 = getRandomNumber(0, 99);
  
      if (data[randomNumber1] && data[randomNumber2]) {
        updateHeroContent(data[randomNumber1], data[randomNumber2]);
        updateSecondContent(data[randomNumber1], data[randomNumber2]);
      }
  
      [9, 10, 11].forEach((index) => {
        if (data[index]) {
          const article = articles[index - 9];
          if (article) {
            const content = data[index];
            article.querySelector(".second-content h6").textContent = content.title;
            article.querySelector(".second-content p").textContent = content.body;
          }
        }
      });
    } catch (error) {
      console.error("Error fetching dummy data:", error);
    }
  }
  
  function updateHeroContent(data1, data2) {
    const heroContent = document.querySelector(".hero-content");
    const h1 = document.createElement("h1");
    const p1 = document.createElement("p");
    h1.textContent = data1.title;
    p1.textContent = data1.body;
    heroContent.appendChild(h1);
    heroContent.appendChild(p1);
  }
  
  function updateSecondContent(data1, data2) {
    const secondContent = document.querySelector(".info-div");
    const h4 = document.createElement("h4");
    const p2 = document.createElement("p");
    h4.textContent = data2.title;
    p2.textContent = data2.body;
    secondContent.appendChild(h4);
    secondContent.appendChild(p2);
  }
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  