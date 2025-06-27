const CACHE_NAME = 'app-cache-v27'; // aumente a versão sempre que alterar

const urlsToCache = [
    '/peliqueiros-br/',
    '/peliqueiros-br/index.html',
    '/peliqueiros-br/icons/menor.png',
    '/peliqueiros-br/icons/maior.png',
    '/peliqueiros-br/manifest.json',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Arquivos em cache');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response && response.headers.get('content-type')?.includes('text/html')) {
                return response.text().then((text) => {
                    const banner = `
                      <style>
                        #promo-banner {
                          position: fixed;
                          top: 0;
                          left: 0;
                          right: 0;
                          z-index: 9999;
                          background-color: #000;
                          color: #fff;
                          padding: 10px 40px 10px 10px;
                          font-family: sans-serif;
                          font-size: 14px;
                          text-align: center;
                          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                        }
                        #promo-banner a {
                          color: #00f;
                          text-decoration: underline;
                        }
                        #close-banner {
                          position: absolute;
                          top: 5px;
                          right: 10px;
                          color: #fff;
                          background: none;
                          border: none;
                          font-size: 16px;
                          cursor: pointer;
                        }
                      </style>
                      <div id="promo-banner">
                        <button id="close-banner" onclick="document.getElementById('promo-banner').remove()">✖</button>
                        🚀 Nova versão Films Pro com Envelopamento, PPF e Window Film! Só R$99 com cupom exclusivo —
                        <a href="https://filmspro.store/apresentacao">Aproveitar agora</a>
                      </div>
                      <div style="margin-top: 60px;"></div>
                    `;
                    const bodyIndex = text.indexOf('<body');
                    if (bodyIndex !== -1) {
                        const openTagEnd = text.indexOf('>', bodyIndex) + 1;
                        const modifiedText = text.slice(0, openTagEnd) + banner + text.slice(openTagEnd);
                        return new Response(modifiedText, {
                            headers: { 'Content-Type': 'text/html' }
                        });
                    }
                    return new Response(text, {
                        headers: { 'Content-Type': 'text/html' }
                    });
                });
            }
            return response || fetch(event.request);
        })
    );
});
