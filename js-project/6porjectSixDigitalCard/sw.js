// sw.js

const CACHE_NAME = 'v1'; // שם של המטמון
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/icon/192x192.png',
  '/icon/512x512.png',
  '/front.jpg',
  '/back.jpg',
  // הוסף כאן את כל הנתיבים שאתה רוצה למטמון
];

// Event to install service worker and cache necessary files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event to activate service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event to serve cached files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});
