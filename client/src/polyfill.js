import { EventSourcePolyfill } from 'event-source-polyfill';
import "core-js/modules/es6.symbol";

window.EventSource = EventSourcePolyfill;