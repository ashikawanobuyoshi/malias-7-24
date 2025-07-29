// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  ssr: true,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/favorites',
        '/product-details/1',
        '/product-details/2',
        '/product-details/3',
        '/product-details/4',
        '/product-details/5',
        '/product-details/6',
        '/product-details/7',
        '/product-details/8',
        '/product-details/9',
        '/product-details/10'
      ]
    }
  },

  app: {
    baseURL: '/',
    trailingSlash: true
  },

  runtimeConfig: {
    onamaeSmtpHost: process.env.ONAMAE_SMTP_HOST,
    onamaeSmtpPort: process.env.ONAMAE_SMTP_PORT,
    onamaeSmtpUser: process.env.ONAMAE_SMTP_USER,
    onamaeSmtpPass: process.env.ONAMAE_SMTP_PASS,
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.S3_BUCKET_NAME
  },

  future: { compatibilityVersion: 4 },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },

  compatibilityDate: '2024-11-01',

  devtools: { enabled: false },

  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '.'),
        '~': resolve(__dirname, '.'),
        '~~': resolve(__dirname, '.'),
        '@assets': resolve(__dirname, 'src/assets')
      }
    },
    server: {
      hmr: {
        host: 'localhost',
        port: 5173,
        protocol: 'ws'
      }
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  css: [
  '@/assets/css/main.css',
  '@/assets/css/tailwind.css'
],

  routeRules: {
    '/favorites/**': { prerender: false }
  }
})

