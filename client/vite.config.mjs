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
    },
    build: {
        outDir: '../src/main/resources/static',
        emptyOutDir: true
    }
});
