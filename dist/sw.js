
import { openDB } from "../node_modules/idb";


export const db = openDB("contacts", 1, {
  upgrade(db){
     db.createObjectStore("contacts",{
      keyPath:"id",
      autoIncrement:true
     })
  }
}
);
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static").then((cache) => {
      cache.addAll([
        "/",
        "/manifest.json",
        "/src/services/fetching",
        "src/App.css",
        "/src/App.jsx",
        "/@vite/client",
        "/src/components/Home/Home.css",
        "/src/components/Home/Home.jsx",
        "http://localhost:3000/src/main.jsx?t=1681689400357",
        "http://localhost:3000/src/App.jsx?t=1681689400357",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  caches.keys().then((cache) => {
    return cache;
  });
});

self.addEventListener("fetch", (evt) => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (
    !(evt.request.url.indexOf("http") === 0) ||
    evt.request.url.startsWith("http://localhost:9000/")
  )
    return; // skip the request. if request is not made with http protocol
  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        (cacheRes) =>
          cacheRes ||
          fetch(evt.request).then((fetchRes) =>
            caches.open("dynemic2").then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize("dynemic2", 75);
              return fetchRes;
            })
          )
      )
      .catch(() => caches.match("/fallback"))
      );
    });
    
    self.addEventListener("sync",(event)=>{
      console.log('hello');
      if(event.tag==="synced"){
        event.waitUntil(
          db.then(res=>{
            res.getAll("contacts").then(res1=>{
              res1.filter(i=>i.synced===false).map(note=>{
                fetch("http://localhost:9000/posts", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({...note,synced:true}),
                });
              })
            })
          })
        )
      }
    })
// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};





