/* eslint-disable no-unused-vars */
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
    // self.clients.claim()
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    console.log('Map Cache')
                    // if (cache !== cacheName) {
                    //     console.log('Service Worker: Clear Old Cache')
                    //     return caches.delete(cache);
                    // }
                })
            )
        })
    )
});

// Call Fetch Event
// self.addEventListener('fetch', e => {
//     console.log('Service Worker: Fetching');

//     if (e.request.method !== 'GET') {
//         console.log('WORKER: fetch event ignored.', e.request.method, event.request.url);
//         return;
//     }

//     e.respondWith(
//         fetch(e.request)
//         .then(res => {
//             console.log('inside fetch')
//             // Make copy/clone of response
//             const resClone = res.clone()
//             // Open cahce
//             caches.open(cacheName).then(cache => {
//                 // Add response to cache
//                 console.log('resClone: ', resClone)
//                 console.log('e.request: ', e.request)
//                 cache.put(e.request, resClone).then(() => {
//                     console.log('we put it')
//                 })
//             });

//             return res
//         })
//         // eslint-disable-next-line no-unused-vars
//         .catch(err => caches.match(e.request).then(res => res))
//     );
// });

var version = 'v1::';

self.addEventListener("fetch", function (event) {
    console.log('WORKER: fetch event in progress.');

    if (event.request.method !== 'GET') {
        console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
        return;
    }

    event.respondWith(
        caches
        .match(event.request)
        .then(function (cached) {
            var networked = fetch(event.request)
                .then(fetchedFromNetwork, unableToResolve)
                .catch(unableToResolve);

            console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;

            function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();

                console.log('WORKER: fetch response from network.', event.request.url);

                caches
                    .open(version + 'pages')
                    .then(function add(cache) {
                        cache.put(event.request, cacheCopy);
                    })
                    .then(function () {
                        console.log('WORKER: fetch response stored in cache.', event.request.url);
                    });

                return response;
            }

            function unableToResolve() {
                console.log('WORKER: fetch request failed in both cache and network.');

                return new Response('<h1>Service Unavailable</h1>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }
        })
    );
});