const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    'https://sahardagan.github.io/sahar10/js-project/6porjectSixDigitalCard/',
    'https://sahardagan.github.io/sahar10/js-project/6porjectSixDigitalCard/index.html',
    'https://sahardagan.github.io/sahar10/js-project/6porjectSixDigitalCard/style.css',
    'https://sahardagan.github.io/sahar10/js-project/6porjectSixDigitalCard/sw.js',
    'https://sahardagan.github.io/sahar10/js-project/6porjectSixDigitalCard/icon/apple-icon-57x57.png',
    // הוסף כאן את כל קובצי המשאבים שברצונך לשמור במטמון
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return Promise.all(
                    urlsToCache.map(url => {
                        return fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok for ' + url);
                                }
                                return cache.put(url, response);
                            })
                            .catch(error => {
                                console.error('Failed to fetch and cache:', error);
                            });
                    })
                );
            })
            .catch(error => {
                console.error('Failed to open cache:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Fetch failed:', error);
            })
    );
});

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
