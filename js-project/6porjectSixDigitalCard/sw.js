self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/',
        './style.css',
        '/js-project/6porjectSixDigitalCard/icon/android-icon-48x48.png',
        './icon/android-icon-72x72.png',
        './icon/android-icon-96x96.png',
        './icon/android-icon-144x144.png',
        './icon/android-icon-192x192.png',
        './icon/android-icon-256x256.png',
        './icon/ms-icon-384x384.png',
        './icon/ms-icon-512x512.png'
      ]).catch(function (error) {
        console.error('Cache addAll failed:', error);
      });
    }).catch(function (error) {
      console.error('Cache open failed:', error);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request).catch(function (error) {
        console.error('Fetch failed:', error);
      });
    }).catch(function (error) {
      console.error('Cache match failed:', error);
    })
  );
});
