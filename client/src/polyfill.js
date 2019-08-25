import { EventSourcePolyfill } from 'event-source-polyfill';
import "core-js/modules/es.symbol";

window.EventSource = EventSourcePolyfill;
