importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
	console.log(`Workbox berhasil dimuat`);
} else {
	console.log(`Workbox gagal dimuat`);
}
  
workbox.precaching.precacheAndRoute([
	{ url: '/manifest.json', revision: '2' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/index.html', revision: '2' },
	{ url: '/standing.html', revision: '1' },
	{ url: '/team.html', revision: '1' },
	{ url: '/pages/home.html', revision: '2' },
	{ url: '/pages/about.html', revision: '1' },
	{ url: '/pages/contact.html', revision: '1' },
	{ url: '/pages/saved.html', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/css/style.css', revision: '2' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/script.js', revision: '1' },
	{ url: '/js/getCompetitions.js', revision: '1' },
	{ url: '/js/getStandings.js', revision: '1' },
	{ url: '/js/getSavedTeam.js', revision: '2' },
	{ url: '/js/getTeam.js', revision: '1' },
	{ url: '/js/sw-push.js', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' },
	{ url: '/js/footer-bar.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/icon-192x192.png', revision: '1' },
	{ url: '/icon-512x512.png', revision: '1' },
	{ url: '/favicon.ico', revision: '1' },
	{ url: '/img/c1.jpg', revision: '1' },
	{ url: '/img/c2.jpg', revision: '1' },
	{ url: '/img/c3.jpg', revision: '1' },
	{ url: '/img/old_trafford.jpg', revision: '1' },
	{ url: '/img/konik_saputra.jpg', revision: '1' },
	{ url: '/img/league/BL1.png', revision: '1' },
	{ url: '/img/league/SA.png', revision: '1' },
	{ url: '/img/league/DED.png', revision: '1' },
	{ url: '/img/league/FL1.png', revision: '1' },
	{ url: '/img/league/PD.png', revision: '1' },
	{ url: '/img/league/PL.png', revision: '1' },
	{ url: '/img/league/no.png', revision: '1' }
], {
	ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(new RegExp('/'),
	workbox.strategies.networkFirst({
		cacheName: 'footballxpwa-v3',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	})
);

workbox.routing.registerRoute(
	/^https:\/\/api\.football\-data\.org\/v2\//,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'api-football-data',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 120,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	})
);


workbox.routing.registerRoute(
	/\.(?:png|jpg|css|svg|ico)$/,
	workbox.strategies.cacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 30,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
			}),
		],
	})
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
