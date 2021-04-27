const cacheName = 'v1'

// Call install Event
self.addEventListener('install', event => {
    console.info('Service Worker: Installed', event);
    event.waitUntil(
        caches.open(cacheName).then(cache => cache.add('/app.js'))
    );
});

// Call Activate Event
self.addEventListener('activate', event => {
    console.info('Service Worker: Activated', event);
    self.clients.claim()
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    console.log('Map Cache')
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clear Old Cache')
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

// // Call Fetch Event
self.addEventListener('fetch', e => {
    self.clients.claim()
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            console.log('inside fetch')
            // Make copy/clone of response
            const resClone = res.clone();
            // Open cahce
            caches.open(cacheName).then(cache => {
                // Add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => caches.match(e.request).then(res => res))
    );
});