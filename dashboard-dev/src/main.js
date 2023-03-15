import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueRouterPrefetch from 'vue-router-prefetch'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
// import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
import uiElement from 'element-ui'
import VueTabs from "vue-nav-tabs";
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// import initProgress from './progressbar';
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'

// router setup
import router from './routes/routes'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/demo.scss'

import './registerServiceWorker'

import VueSocialSharing from 'vue-social-sharing'




// plugin setup
Vue.use(VueRouter)
Vue.use(uiElement, { locale })
Vue.use(VueRouterPrefetch)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(VeeValidate)
    // locale.use(lang)
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(VueTabs)
Vue.use(VueFormWizard)
Vue.use(VueSocialSharing);


const ADMIN = 1
const SUB_ADMIN = 2
const COOKIE_VARIABLE = 'myprofile'
Vue.cookieVariable= Vue.prototype.cookieVariable  = 'myprofile';


var vm = this;
router.beforeEach((to, from, next) => {
    let cook = ''
    try {
        cook = Vue.cookies.get(router.app.cookieVariable)
    } catch (err) {
        Vue.cookies.remove(router.app.cookieVariable, "/");
    }
    if (cook != null) {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
            if (to.path == '/') {
                next('/login');
            } else {
                next()
            }
        } else {
            if (to.path == '/') {
                next('/login');
            } else {
                next()
            }
        }
    } else {
        if (to.path == '/') {
            next('/login');
        } else if (to.path == '/login') {
            next()
        } else {
            next();
        }
    }
});

Vue.http.options.credentials = false
Vue.http.options.emulateJSON = true

Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Access-Control-Allow-Origin'
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Access-Control-Allow-Credentials'] = false
if (window.location.hostname == 'localhost') {
    Vue.http.options.root = 'http://localhost:8000/api/'
}



Vue.http.interceptors.push((request, next) => {
    let cook = Vue.cookies.get(router.app.cookieVariable)
    let token = ""
    if (cook) {
        token = cook.token
    } else {
        token = ""
    }
    request.headers.set('Authorization', 'Bearer ' + token)
    // request.headers.set('Authorization', token)
    request.headers.set('Accept', 'application/json')
    return (response) => {
        // if (response.status === 401) {
        //     router.push('/login')
        // }
    }
})

Vue.config.errorHandler = (err, vm, info) => {
    console.log(err)
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.

    // TODO: Perform any custom logic or log to server

};



// configure router
// const router = new VueRouter({
//   routes, // short for routes: routes
//   linkActiveClass: 'active',
//   scrollBehavior: (to) => {
//     if (to.hash) {
//       return {selector: to.hash}
//     } else {
//       return { x: 0, y: 0 }
//     }
//   },
//   mode: 'history'
// })

// initProgress(router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router
})