
      function search(event) {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput");
        const query = searchInput.value.trim();
        let url = "";
        try {
          const urlObject = new URL(query);
          if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
            urlObject.protocol = "https:";
          }
          url = urlObject.toString();
        } catch {
          if (/^[a-z]+\.[a-z]{2,}$/i.test(query)) {
            url = "https://" + query;
          } else {
            const searchEngine = localStorage.getItem("searchengine");
            if (searchEngine === "google") {
              url = "https://google.com/search?q=" + encodeURIComponent(query);
            } else if (searchEngine === "duckduckgo") {
              url = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
            //} else if (searchEngine === "bing") {
            //  url = "https://bing.com/search?q=" + encodeURIComponent(query);
            } else {
              url = "https://bing.com/search?q=" + encodeURIComponent(query);
            };
          }
        }
        
        window.navigator.serviceWorker.register("/sw.js", {
          scope: __uv$config.prefix
        }).then(() => {
          console.log("Service worker registration successful");
          sessionStorage.setItem("uvURL", __uv$config.encodeUrl(url));
          location.href = "go.html";
          console.log("Redirection to html-loader successful");
        }).catch((error) => {
          console.error("Service worker registration failed:", error);
        });
      }