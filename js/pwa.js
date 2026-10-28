(function () {
'use strict';
var _0x17a = 'mvcs-instalar-postergado';
var _0x29b = 7;
var _0x31c = 1500;
if ('serviceWorker' in navigator) {
window.addEventListener('load', function () {
navigator.serviceWorker.register('sw.js').catch(function (e) {
console.warn('No se pudo registrar el service worker:', e);
});
});
}
var _0x309 = navigator.userAgent || '';
function _0x41a() {
return /iPad|iPhone|iPod/.test(_0x309) ||
(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
function _0x52b() {
return _0x41a() ||
/Android|Mobile|IEMobile|Opera Mini/i.test(_0x309) ||
(window.matchMedia('(pointer: coarse)').matches &&
window.matchMedia('(max-width: 1024px)').matches);
}
function _0x63c() {
return window.matchMedia('(display-mode: standalone)').matches ||
window.navigator.standalone === true ||
document.referrer.indexOf('android-app://') === 0;
}
function _0x74d() {
try {
var _0x52c = parseInt(localStorage.getItem(_0x17a), 10);
return !!_0x52c && Date.now() < _0x52c;
} catch (e) { return false; }
}
function _0x85e() {
try {
localStorage.setItem(_0x17a, String(Date.now() + _0x29b * 864e5));
} catch (e) { }
}
var _0x96f = document.getElementById('pwa-install');
if (!_0x96f) return;
var _0xa70 = _0x96f.querySelector('[data-pwa-mode="prompt"]');
var _0xb81 = _0x96f.querySelector('[data-pwa-mode="ios"]');
var _0xc92 = _0x96f.querySelector('[data-pwa-mode="ios-final"]');
var _0xda3 = document.getElementById('pwa-install-btn');
var _0xeb4 = document.getElementById('pwa-install-ios');
var _0xfc5 = null;
var _0x0d6 = false;
function _0x1e7(modo) {
if (_0x0d6 || _0x63c()) return;
_0x0d6 = true;
_0xa70.hidden = (modo !== 'prompt');
_0xb81.hidden = (modo !== 'ios');
_0xc92.hidden = (modo !== 'ios-final');
_0x96f.hidden = false;
void _0x96f.offsetWidth;
_0x96f.classList.add('is-open');
document.body.classList.add('pwa-lock');
}
function _0x2f8(recordar) {
if (!_0x0d6) return;
_0x0d6 = false;
if (recordar !== false) _0x85e();
_0x96f.classList.remove('is-open');
_0x96f.classList.remove('espera-ios');
document.body.classList.remove('pwa-lock');
window.setTimeout(function () {
if (!_0x0d6) _0x96f.hidden = true;
}, 300);
}
Array.prototype.forEach.call(
_0x96f.querySelectorAll('[data-pwa-close]'),
function (el) { el.addEventListener('click', function () { _0x2f8(true); }); }
);
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape') _0x2f8(true);
});
window.addEventListener('beforeinstallprompt', function (e) {
e.preventDefault();
_0xfc5 = e;
if (!_0x52b() || _0x74d() || _0x63c()) return;
window.setTimeout(function () { _0x1e7('prompt'); }, _0x31c);
});
_0xda3.addEventListener('click', function () {
if (!_0xfc5) { _0x2f8(true); return; }
var _0x63d = _0xfc5;
_0xfc5 = null;
_0x63d.prompt();
_0x63d.userChoice.then(function (r) {
_0x2f8(r && r.outcome === 'dismissed');
});
});
_0xeb4.addEventListener('click', function () {
_0xb81.hidden = true;
_0xc92.hidden = false;
_0x96f.classList.add('espera-ios');
});
window.addEventListener('appinstalled', function () {
_0xfc5 = null;
_0x2f8(true);
});
var _0x41b = (location.search.match(/[?&]instalar=([^&]*)/) || [])[1];
if (_0x41b) {
window.setTimeout(function () {
if (_0x41b === 'ios-final') {
_0x1e7('ios-final');
_0x96f.classList.add('espera-ios');
} else {
_0x1e7(_0x41b === 'ios' ? 'ios' : 'prompt');
}
}, 300);
return;
}
if (_0x41a() && !_0x63c() && !_0x74d()) {
window.setTimeout(function () {
if (!_0x0d6) _0x1e7('ios');
}, _0x31c);
}
})();
