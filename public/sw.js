importScripts("./uv/uv.bundle.js");
importScripts("./uv/uv.config.js");
importScripts("./uv/uv.sw.js");

const uv = new UVServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      if (event.request.url.startsWith(location.origin + "/service/")) {
        return await uv.fetch(event);
      }

      return await fetch(event.request);
    })()
  );
});
