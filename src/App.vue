<template>
  <v-app>
    <v-main class="grey lighten-2">
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/views/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  data: () => ({
    //
  }),
  beforeCreate () {
    // if ('serviceWorker' in navigator) {
    //   console.log('Service Worker Supported')
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker
    //     .register('/service_worker/cached_requests.js')
    //     .then(reg => console.info('Service Worker: Registered', reg))
    //     .catch(err => console.error(`Service Worker: Error: ${err}`))
    //   })
    // }
  },
  mounted () {
    // document.querySelectorAll('#app')
    //   .addEventListener('fetch', e => {
    //       e.respondWith(
    //       fetch(e.request)
    //       .then(res => {
    //           console.log('inside fetch')
    //           // Make copy/clone of response
    //           const resClone = res.clone()
    //           // Open cahce
    //           caches.open('v3').then(cache => {
    //               // Add response to cache
    //               console.log('resClone: ', resClone)
    //               console.log('e.request: ', e.request)
    //               cache.put(e.request, resClone).then(() => {
    //                   console.log('we put it')
    //                   caches.open('v2').then(function (cache) {
    //                       cache.put(e.request, resClone);
    //                   });
    //               })
    //           });



    //           return res
    //       })
    //       // eslint-disable-next-line no-unused-vars
    //       .catch(err => caches.match(e.request).then(res => res))
    //   );
    //   })
  }
};
</script>
