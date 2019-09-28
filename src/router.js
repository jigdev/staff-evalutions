import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


function lazyLoad(view){
    return() => import(`@/pages/${view}.vue`)
  }

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: lazyLoad('Base'),
            children: [
                {
                    name: 'home',
                    path: '/',
                    component: lazyLoad('Home')
                }
            ]
        },
        {
            //For future development
            name: 'auth',
            path: '/auth',
            component: lazyLoad('Login'),
        },
    ],
})

router.path = routeName => {
    return router.matcher.match({name: routeName}).path
}

export default router

