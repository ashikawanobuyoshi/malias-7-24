// plugins/router-guard.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      const router = useRouter();
  
      router.beforeEach((to, from, next) => {
        console.log('Navigating to:', to.fullPath);
        next();
      });
    }
  });
  