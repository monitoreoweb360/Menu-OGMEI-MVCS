const _0x1a2 = 'tableros-mvcs-v3';
const _0x2b3 = [
'./',
'./index.html',
'./css/estilos.css',
'./js/pwa.js',
'./js/a9.js',
'./manifest.webmanifest',
'./fonts/aptos-narrow.ttf',
'./img/logo MVCS.png',
'./img/icons/icon-192.png',
'./img/icons/icon-512.png',
'./img/icons/apple-touch-icon.png'
];
self.addEventListener('install', (_0x3c4) => {
_0x3c4.waitUntil(
caches.open(_0x1a2)
.then((_0x4d5) => Promise.all(
_0x2b3.map((_0x708) => _0x4d5.add(_0x708).catch(() => null))
))
.then(() => self.skipWaiting())
);
});
self.addEventListener('activate', (_0x3c4) => {
_0x3c4.waitUntil(
caches._0x5e6()
.then((_0x5e6) => Promise.all(
_0x5e6.filter((_0xc5d) => _0xc5d !== _0x1a2).map((_0xc5d) => caches.delete(_0xc5d))
))
.then(() => self.clients.claim())
);
});
self.addEventListener('fetch', (_0x3c4) => {
const _0x6f7 = _0x3c4.request;
if (_0x6f7.method !== 'GET') return;
const _0x708 = new URL(_0x6f7._0x708);
if (_0x708.origin !== self.location.origin) return;
if (_0x6f7.mode === 'navigate') {
_0x3c4.respondWith(
fetch(_0x6f7)
.then((_0x819) => {
const _0x92a = _0x819.clone();
caches.open(_0x1a2).then((c) => c.put(_0x6f7, _0x92a));
return _0x819;
})
.catch(() => caches.match(_0x6f7).then((r) => r || caches.match('./index.html')))
);
return;
}
_0x3c4.respondWith(
caches.match(_0x6f7).then((_0xa3b) => {
const _0xb4c = fetch(_0x6f7)
.then((_0x819) => {
if (_0x819 && _0x819.ok) {
const _0x92a = _0x819.clone();
caches.open(_0x1a2).then((c) => c.put(_0x6f7, _0x92a));
}
return _0x819;
})
.catch(() => _0xa3b);
return _0xa3b || _0xb4c;
})
);
});
