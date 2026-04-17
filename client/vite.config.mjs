import { resolve } from 'node:path';

import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/register': {
                target: 'http://localhost:8080'
            }
        }
    }
});