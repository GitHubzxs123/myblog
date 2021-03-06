import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Classification from '../components/classification.vue'
import Tag from '../components/tag.vue'
import TimeLine from '../components/timeLine.vue'
import Article from '../components/article.vue'
import About from '../components/about.vue'
import Search from '../components/search.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/timeLine',
            name: 'timeLine',
            component: TimeLine
        },
        {
            path: '/classification',
            name: 'classification',
            component: Classification
        },
        {
            path: '/tag',
            name: 'tag',
            component: Tag
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        }
    ]
})