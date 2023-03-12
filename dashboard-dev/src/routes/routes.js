import Vue from "vue";
import VueRouter from "vue-router";

import NotFound from "../components/GeneralViews/NotFoundPage.vue";
import NoAccess from "../components/GeneralViews/NoAccess.vue";


import Login from "src/components/Dashboard/Views/Pages/Login.vue";
import Register from "src/components/Dashboard/Views/Pages/Register.vue";
import Profile from "src/components/Dashboard/Views/Pages/UserProfile.vue";



let loginPage = {
    path: "/login",
    name: "Login",
    component: Login
};

let registerPage = {
    path: "/register",
    name: "Register",
    component: Register
};

let profilepage = {
    path: "/profile",
    name: "Profile",
    component: Profile
};


const routes = [
    loginPage,
    registerPage,
    profilepage,
    { path: "*", component: NotFound }
];

Vue.use(VueRouter);
// configure router
const router = new VueRouter({
    // base: '/dashboard/',
    mode: 'history',
    routes, // short for routes: routes
    linkActiveClass: "active",

});

export default router;