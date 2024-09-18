import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path';

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    build: {
        outDir: './dist',
        emptyOutDir: true,
        assetsDir: '.',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                app: resolve(__dirname, 'src/index.tsx'),
            },
            output: {
              entryFileNames: 'bundle.js',
            },
        }
    },
    server: {    
        host: true,
        port: 3000, 
        open: false
    },
})
