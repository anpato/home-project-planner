/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'cjs',
  appDirectory: 'app',
  tailwind: true,
  postcss: true
  // routes(defineRoutes) {
  //   return defineRoutes((route) => {
  //     const prefix = 'routes';
  //     route('/', `${prefix}/_index.tsx`, { index: true });
  //     route('auth', `${prefix}/auth/route.tsx`);
  //     route('my', `${prefix}/my/route.tsx`, () => {
  //       route('dashboard', `${prefix}/my/dashboard/route.tsx`);
  //     });
  //   });
  // }
};
