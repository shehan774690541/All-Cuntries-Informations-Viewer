import { createRouter, createWebHistory } from 'vue-router';
import routes from '/src/router/routes';
import useStore from 'pinia'; // Assuming useStore is imported correctly

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, router, useStore };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: PipeLine(context, middleware, 1),
  });
});

export default router;
