import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './app/home'
import User from './app/user'
import UserHome from './app/userhome'
import Discover from './app/discover'
import Around from './app/around'

Vue.use(VueRouter)

const routes = [
	{
		path: '/home',
		component: Home,
		children: [
			{
				path: 'discover',
				component: Discover
			},
			{
				path: 'around',
				component: Around
			}
		]
	},
	{
		path: '/user',
		component: User
	},
	{
		path: '/user/:account',
		component: UserHome
	},
	// 重定向
    {
        path: '/', 
        redirect: '/home' 
    }
]

const router = new VueRouter({
	routes
}) 

export default router ;
