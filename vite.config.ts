import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

// In-development proxy handler for /api/sachet
function sachetDevProxyPlugin(): Plugin {
  return {
    name: 'sachet-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/sachet', async (req, res) => {
        try {
          const handler = (await import('./api/sachet')).default;
          await handler(req, res);
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Proxy failed', details: err?.message }));
        }
      });
    },
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [sachetDevProxyPlugin()],
  build: {
    outDir: 'dist',
    target: 'es2020',
    sourcemap: true,
  },
});
