import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import DashGlobal from '@/components/home/DashGlobal'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'
import ItemSearch from '@/components/item/ItemSearch'
import EntitySearch from '@/components/entity/EntitySearch'
import EletronicPoints from '@/components/employee/EletronicPoints'

import {userKey} from '@/global'

Vue.use(VueRouter)

const routes = [
{
    name: 'home',
    path: '/',
    component: DashGlobal
},
{
    name: 'dashGlobal',
    path: '/dash',
    component: Home,

},
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true}
},
{
    name: 'itemSearch',
    path: '/groupitems/:id/items',
    component: ItemSearch
},
{
    name: 'entitySearch',
    path: '/groupentitys/:id/entitys',
    component: EntitySearch
},
{
    name: 'auth',
    path: '/auth',
    component: Auth
},
{
    name: 'eletronicPoints',
    path: '/eletronicpoints',
    component: EletronicPoints
},

{
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},
{
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}

]


const router = new VueRouter({
    mode: 'history',
    routes
})

 router.beforeEach((to, from, next) =>{
     const json = localStorage.getItem(userKey)
     if(to.matched.some(record => record.meta.requiresAdmin)){
         const user = JSON.parse(json)
         user && user.admin || user.super ? next() : next({path: '/'})
     }else{
         next()
     }
 }  

 )


export default router

