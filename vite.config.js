import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.pdf', '**/*.docx', '**/*.xlsx', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.mp3', '**/*.mp4', ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        
        entryFileNames: 'js/[name]-[hash].js',
      }
    }
  }
})