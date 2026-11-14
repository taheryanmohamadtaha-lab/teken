const N='ivi1',F=['./','index.html','style.css','game.js','sprites.js','assets/characters/iranian/atlas.png','assets/characters/indian/atlas.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(N).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
