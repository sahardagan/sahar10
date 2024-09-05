const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/sw.js',
    '/icon/apple-icon-57x57.png',
    // הוסף כאן את כל קובצי המשאבים שברצונך לשמור במטמון
];

// התקנה - שמירה של המשאבים במטמון
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache resources:', error);
            })
    );
});

// הפעלה - טיפול בבקשות מהדף
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // אם הקובץ קיים במטמון, השתמש בו
                if (response) {
                    return response;
                }
                // אחרת, בצע את הבקשה לשרת
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Fetch failed:', error);
            })
    );
});

// הפעלת מטמון ישן
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});
