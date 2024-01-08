'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "7d69e653079438abfbb24b82a655b0a4",
"version.json": "5ead37cc0966775c3f3017db57c7cc80",
"index.html": "7d54dbc83ba69d5f8d1395fc944e1431",
"/": "7d54dbc83ba69d5f8d1395fc944e1431",
"main.dart.js": "bc17197657f45234a0eea57893d3e328",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"assets/AssetManifest.json": "7f7244e3a352d22dd59263c4720e6e67",
"assets/AssetManifest.bin.json": "f3c3cd56027e52f030989ddec55db32c",
"assets/assets/svg/flag-poland.svg": "0b989e33a21b9fc885a7193dd95f226d",
"assets/assets/svg/mail.svg": "b237b335d5f6d640e995fee6c58e6096",
"assets/assets/svg/Illustration2.svg": "804c36bfefef0a4a0da6771b1a104b71",
"assets/assets/svg/card1.svg": "4fdf01907dfe63672ce73c98109a8f74",
"assets/assets/svg/card3.svg": "7358e8f2af06364ad62d0bd0641f8097",
"assets/assets/svg/Illustration4.svg": "755ad8df2ec7be7709d60b337cf83be8",
"assets/assets/svg/card2.svg": "fabc23036050c2811002a0696c0eebc7",
"assets/assets/svg/Illustration1.svg": "9dc83c9d786406143b17b52de77c0120",
"assets/assets/svg/Illustration3.svg": "8f9e8f0abbdb585bdb224d13ed2f64be",
"assets/assets/fonts/merriweather/Merriweather-Bold.ttf": "79ea53fed59f391498dfc6f2fbea97c2",
"assets/assets/fonts/merriweather/Merriweather-BlackItalic.ttf": "4c5b0354e588a8387e588ccdd4fc2dd8",
"assets/assets/fonts/merriweather/Merriweather-LightItalic.ttf": "e5ce4649f1b543ef4431a3e149271bea",
"assets/assets/fonts/merriweather/Merriweather-BoldItalic.ttf": "fee74a810c9df73fe7218e4ff5815830",
"assets/assets/fonts/merriweather/Merriweather-Italic.ttf": "b974ea37b30597dbf7b8d6d0ef38de89",
"assets/assets/fonts/merriweather/Merriweather-Regular.ttf": "e2f219e63a575a41e10f991e9c95819a",
"assets/assets/fonts/merriweather/Merriweather-Light.ttf": "eccb6c6a243a3d44219648b6cdbc58ce",
"assets/assets/fonts/merriweather/Merriweather-Black.ttf": "3fc5af7aaeb3de5b417fcfbd8a8b10c2",
"assets/assets/fonts/nova_square/NovaSquare-Regular.ttf": "587aee63e5841933aa66a34db7dbe587",
"assets/assets/png/city.png": "513b51980973ff3dc079e6efded2fcb6",
"assets/assets/png/qa_avatar.png": "a2d4ca1f1011f6a578eda52925025d2f",
"assets/assets/png/ui_ux_avatar.png": "f47ea7b5471fd49eab965edc2b71d15d",
"assets/assets/png/flutter_avatar.png": "8033cb1771b2912b6844a1504c756e8d",
"assets/assets/png/finance_avatar.png": "4a60e1c381059eb03d4ebf55e3e0e4df",
"assets/assets/png/logo.png": "102512aa0f329659a3a9f9d79c17853e",
"assets/assets/png/left_pic.png": "64f3f59194536586be0ef6b5ad8f2147",
"assets/assets/png/header.png": "b090edf928a9691783ecfac33f36d337",
"assets/AssetManifest.bin": "7df575c0a83727a70389ffe31289574c",
"assets/FontManifest.json": "ea16feda6e08d224be4ce0094adc2108",
"assets/NOTICES": "cf4c4c2a812d7cdd6afffa2610c76c60",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "1d2c06665e56dab437a723f566dfdb42",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
