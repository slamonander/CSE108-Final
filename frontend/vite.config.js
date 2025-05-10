// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'  // this is what Vercel looks for
  }
});
