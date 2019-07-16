import VueRouter from 'vue-router'
import routes from './routes'

export const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active',
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})
