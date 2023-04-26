import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


const fn = (tag: string) => {
  tag == 'wc-toast'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})
