self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/peliqueiros-br/',
        '/peliqueiros-br/index.html',
        '/peliqueiros-br/icons/menor.png',
        '/peliqueiros-br/icons/maior.png',
        // Adicione outros recursos necessários para o funcionamento offline aqui
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
