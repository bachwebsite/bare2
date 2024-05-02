const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const input = document.querySelector("input");

function reload() {
    document.getElementById("iframeId").src = document.getElementById("iframeId").src;
}
function back() {
    document.getElementById("iframeId").contentWindow.history.back();
}
function forward() {
    document.getElementById("iframeId").contentWindow.history.forward();
}

var elem = document.documentElement;
var isFullscreen = false;


function openFullScreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    isFullscreen = true;
}

function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    isFullscreen = false;
}

function toggleFullScreen() {
    if (isFullscreen) {
        closeFullScreen();
    } else {
        openFullScreen();
    }
}


function newTab() {
    window.open(document.getElementById("iframeId").src);
}

class crypts {
    static encode(str) {
      return encodeURIComponent(
        str
          .toString()
          .split("")
          .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
          .join("")
      );
    }
  
    static decode(str) {
      if (str.charAt(str.length - 1) === "/") {
        str = str.slice(0, -1);
      }
      return decodeURIComponent(
        str
          .split("")
          .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
          .join("")
      );
    }
  }
  
  function search(input) {
    input = input.trim();
    const searchTemplate = localStorage.getItem('engine') || 'https://google.com/search?q=%s';
  
    try {
      return new URL(input).toString();
    } catch (err) {
      try {
        const url = new URL(`http://${input}`);
        if (url.hostname.includes(".")) {
          return url.toString();
        }
        throw new Error('Invalid hostname');
      } catch (err) {
        return searchTemplate.replace("%s", encodeURIComponent(input));
      }
    }
  }
  if ('serviceWorker' in navigator) {
    var proxySetting = localStorage.getItem('proxy') || 'uv';
    let swConfig = {
      'uv': { file: '/sw.js', config: __uv$config },
    };
    let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];
    navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix })
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
  
          let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));
          document.getElementById("iframeId").src = encodedUrl;
        });
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
  }