import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SearchHero from '@/views/search-hero'
import Mechanics from '@/views/mechanics'
import Guides from '@/views/guides'
import Hero from '@/views/hero'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/search/hero',
            name: 'search-hero',
            component: SearchHero
        },
        {
            path: '/mechanics',
            name: 'mechanics',
            component: Mechanics
        },
        {
            path: '/guides',
            name: 'guides',
            component: Guides
        },
        {
            path: '/hero/:id',
            name: 'hero',
            component: Hero
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
