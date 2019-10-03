import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/basecomponents/404'
import Dashboard from '../components/'
import OrderList from '../components/orders/'
import About from '../components/about/'
import CustomerList from '../components/customer/'
import Products from '../components/product/'
import SelfEvalutions from '../components/evalutions/'
import Departments from '../components/department/'
import Users from '../components/users/'
import Login from '@/basecomponents/Login'
import ChangePassword from '@/basecomponents/ChangePassword'
import auth from '@/utils/auth'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

// const debug = process.env.NODE_ENV !== 'production'

export default new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/404', component: ErrorPage, name: 'ErrorPage' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard', beforeEnter: requireAuth },
    { path: '/about', component: About, name: 'About', beforeEnter: requireAuth },
    { path: '/orders', component: OrderList, name: 'Orders', beforeEnter: requireAuth },
    { path: '/customers', component: CustomerList, name: 'Customers', beforeEnter: requireAuth },
    { path: '/products', component: Products, name: 'Products', beforeEnter: requireAuth },
    { path: '/evalutions', component: SelfEvalutions, name: 'Evalutions', beforeEnter: requireAuth },
    { path: '/departments', component: Departments, name: 'Departments', beforeEnter: requireAuth },
    { path: '/users', component: Users, name: 'Users', beforeEnter: requireAuth },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/changePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/login')
      }
    },
    { path: '/', redirect: '/dashboard' },
    { path: '*', redirect: '/404' }
  ],
  meta: {
    progress: {
      func: [
        {call: 'color', modifier: 'temp', argument: '#ffb000'},
        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        {call: 'location', modifier: 'temp', argument: 'top'},
        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
      ]
    }
  }
})
