import App from './app';
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";

if (browserSupportsAllFeatures()) {
    new App().start();
} else {
    import('./polyfill').then(() => new App().start()).catch(e=>console.log(e));
}

function browserSupportsAllFeatures() {
    return window.EventSource;
}