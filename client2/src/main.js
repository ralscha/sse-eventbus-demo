import App from './app';

if (browserSupportsAllFeatures()) {
    new App().start();
} else {
    loadScript('https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=EventSource,Symbol,Array.prototype.@@iterator,Array.prototype.entries', function () {
        new App().start();
    });
}

function browserSupportsAllFeatures() {
    return window.EventSource && window.Symbol && Array.prototype.entries;
}

function loadScript(src, done) {
    var js = document.createElement('script');
    js.src = src;
    js.onload = function () {
        done();
    };
    js.onerror = function () {
        done(new Error('Failed to load script ' + src));
    };
    document.head.appendChild(js);

}
