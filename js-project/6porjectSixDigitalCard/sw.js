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
                                // שים לב שה-URL מצוין במדויק עם ה-Request
                                return cache.put(url, response.clone());
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
                    return response; // Return cached response if available
                }
                return fetch(event.request) // Otherwise fetch from network
                    .then(networkResponse => {
                        // Check if the response is valid
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        console.error('Fetch failed:', error);
                        throw error; // Re-throw the error for handling
                    });
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
