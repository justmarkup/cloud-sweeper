const version = 'v1.0.0:';

const offlineFundamentals = [
	'./',
	'index.html',
	'css/styles.css',
	'js/external/npo.js',
	'js/external/eventemitter3.min.js',
	'js/debug.js',
	'js/utils.js',
	'js/browser.js',
	'js/storage.js',
	'js/plane.js',
	'js/plane/prop.js',
	'js/plane/body.js',
	'js/clouds.js',
	'js/bird.js',
	'js/text.js',
	'js/screens.js',
	'js/screens/welcome.js',
	'js/screens/play-intro.js',
	'js/screens/retry.js',
	'js/interaction.js',
	'js/game.js',
	'images/birds/frame-1.svg',
	'images/birds/frame-2.svg',
	'images/birds/frame-3.svg',
	'images/clouds/cloud-1.svg',
	'images/clouds/cloud-2.svg',
	'images/clouds/cloud-3.svg',
	'images/clouds/cloud-4.svg',
	'images/clouds/cloud-5.svg',
	'images/clouds/cloud-6.svg',
	'images/clouds/cloud-7.svg',
	'images/clouds/cloud-8.svg',
	'images/clouds/cloud-9.svg',
	'images/clouds/cloud-10.svg',
	'images/clouds/cloud-11.svg',
	'images/clouds/cloud-12.svg',
	'images/clouds/target.svg',
	'images/clouds/exploding/frame-1.svg',
	'images/clouds/exploding/frame-2.svg',
	'images/clouds/exploding/frame-3.svg',
	'images/clouds/exploding/frame-4.svg',
	'images/clouds/exploding/frame-5.svg',
	'images/clouds/exploding/frame-6.svg',
	'images/clouds/exploding/frame-7.svg',
	'images/clouds/exploding/frame-8.svg',
	'images/clouds/exploding/frame-9.svg',
	'images/clouds/exploding/frame-10.svg',
	'images/plane/body.svg',
	'images/plane/prop/frame-1.svg',
	'images/plane/prop/frame-2.svg',
	'images/plane/prop/frame-3.svg',
	'images/screens/game-over.svg',
	'images/screens/retry.svg',
	'images/screens/scoreboard.svg',
	'images/screens/sun-meter.svg',
	'images/screens/sun-meter-bar.svg',
	'images/screens/sun-meter-bar-top.svg',
	'images/screens/welcome.svg',
	'images/screens/play-hint/frame-1.svg',
	'images/screens/play-hint/frame-2.svg',
	'images/screens/play-hint/frame-3.svg',
	'images/screens/play-hint/frame-4.svg',
	'images/screens/play-hint/frame-5.svg',
	'images/screens/play-hint/frame-6.svg',
	'images/screens/play-hint/frame-7.svg',
	'images/screens/play-hint/frame-8.svg',
	'images/screens/play-hint/frame-9.svg',
	'images/screens/play-hint/frame-10.svg',
	'images/screens/play-hint/frame-11.svg',
	'images/screens/play-hint/frame-12.svg',
	'images/screens/play-hint/frame-13.svg',
	'images/screens/play-hint/frame-14.svg',
	'images/screens/play-hint/frame-15.svg',
	'images/screens/play-hint/text.svg',
	'images/text/big/0.svg',
	'images/text/big/1.svg',
	'images/text/big/2.svg',
	'images/text/big/3.svg',
	'images/text/big/4.svg',
	'images/text/big/5.svg',
	'images/text/big/6.svg',
	'images/text/big/7.svg',
	'images/text/big/8.svg',
	'images/text/big/9.svg',
	'images/text/big/space.svg',
	'images/text/small/0.svg',
	'images/text/small/1.svg',
	'images/text/small/2.svg',
	'images/text/small/3.svg',
	'images/text/small/4.svg',
	'images/text/small/5.svg',
	'images/text/small/6.svg',
	'images/text/small/7.svg',
	'images/text/small/8.svg',
	'images/text/small/9.svg',
	'images/text/small/space.svg'
]

//Add core website files to cache during serviceworker installation
var updateStaticCache = function() {
	return caches.open(version).then(function(cache) {
		return Promise.all(offlineFundamentals.map(function(value) {
			var request = new Request(value);
			return fetch(request).then(function(response) { 
				var cachedCopy = response.clone();
				return cache.put(request, cachedCopy); 
				
			});
		}))
	})
};


//When the service worker is first added
self.addEventListener("install", function(event) {
	console.log('install');
	event.waitUntil(updateStaticCache()
				.then(function() { 
					return self.skipWaiting(); 
				})
			);
})

// Cache, falling back to network
self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});

function clearOldCaches() {
	return caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return key.indexOf(version) !== 0;
		}).map(function (key) {
			return caches["delete"](key);
		}));
	});
}

//After the install event
self.addEventListener('activate', function (event) {
	console.log('activate');
	event.waitUntil(clearOldCaches().then(function () {
		return self.clients.claim();
	}));
});
