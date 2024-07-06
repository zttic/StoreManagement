import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [NaiveUiResolver(), VantResolver()],
      imports: [
        'vue',
        // {
        //   'naive-ui': [
        //     'useDialog',
        //     'useMessage',
        //     'useNotification',
        //     'useLoadingBar'
        //   ]
        // }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver(), VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
