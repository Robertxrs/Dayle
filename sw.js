const CACHE_NAME = 'dale-app-cache-v1';
// Adicione aqui os arquivos principais do seu app que você quer que funcionem offline
const urlsToCache = [
  '/',
  '/index.html'
  // No futuro, se você adicionar arquivos CSS ou JS separados, adicione-os aqui.
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Intercepta as requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar a requisição no cache primeiro
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna a resposta do cache
        if (response) {
          return response;
        }
        // Se não encontrar, faz a requisição à rede
        return fetch(event.request);
      })
  );
});