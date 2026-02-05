/**
 * Service Worker - Cache-First Strategy
 * Ensures 100% offline functionality for PWA
 */

const CACHE_NAME = 'adel-math-game-v2';
const ASSETS_TO_CACHE = [
  // HTML
  './',
  './index.html',
  
  // CSS
  './theme.css',
  './components.css',
  
  // JavaScript
  './index.js',
  './game/GameController.js',
  './game/GameState.js',
  './game/QuestionGenerator.js',
  './game/MusicManager.js',
  './game/SoundManager.js',
  './ui/components/LoginScreen.js',
  './ui/components/GameScreen.js',
  './ui/components/PuzzlePage.js',
  './ui/components/StageCompletionScreen.js',
  './ui/components/FinalCelebrationScreen.js',
  
  // Images - Adel
  './assets/images/adel/adel-happy.png',
  './assets/images/adel/adel-thinking.png',
  
  // Images - Mati Pieces (1-13)
  './assets/images/mati/mati-piece-01.png',
  './assets/images/mati/mati-piece-02.png',
  './assets/images/mati/mati-piece-03.png',
  './assets/images/mati/mati-piece-04.png',
  './assets/images/mati/mati-piece-05.png',
  './assets/images/mati/mati-piece-06.png',
  './assets/images/mati/mati-piece-07.png',
  './assets/images/mati/mati-piece-08.png',
  './assets/images/mati/mati-piece-09.png',
  './assets/images/mati/mati-piece-10.png',
  './assets/images/mati/mati-piece-11.png',
  './assets/images/mati/mati-piece-12.png',
  './assets/images/mati/mati-piece-13.png',
  
  // Images - UI
  './assets/images/ui/adel-mascot.png',
  './assets/images/ui/adel-mati-team.png',
  './assets/images/ui/background-lavender.png',
  
  // Images - Icons (PWA)
  './assets/images/icon/icon-192.png',
  './assets/images/icon/icon-512.png',
  './assets/images/icon/apple-touch-icon.png',
  
  // Sounds
  './assets/sounds/background-music.mp3',
  './assets/sounds/correct.mp3',
  './assets/sounds/timer-warning.mp3',
  './assets/sounds/wrong.mp3',
  
  // Manifest
  './manifest.json'
];

// Install event - Cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        // Silently fail for missing assets
      })
  );
  self.skipWaiting();
});

// Activate event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Cache-First Strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Cache-First: Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses or non-basic responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache images, sounds, and scripts
            const url = new URL(event.request.url);
            const isAsset = 
              url.pathname.match(/\.(png|jpg|jpeg|mp3|js|css|woff|woff2|ttf|html|json)$/i) ||
              url.pathname.includes('/assets/') ||
              url.pathname.includes('/game/') ||
              url.pathname.includes('/ui/') ||
              url.pathname === '/' ||
              url.pathname.endsWith('/index.html') ||
              url.pathname === '/index.html';

            if (isAsset && responseToCache) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache).catch(() => {
                    // Silently fail if caching fails
                  });
                })
                .catch(() => {
                  // Silently fail if cache open fails
                });
            }

            return response;
          })
          .catch(() => {
            // Network failed - return cached version if available
            return caches.match(event.request) || new Response('Offline', { status: 503 });
          });
      })
      .catch(() => {
        // Cache match failed - try network
        return fetch(event.request).catch(() => {
          return new Response('Service Unavailable', { status: 503 });
        });
      })
  );
});
