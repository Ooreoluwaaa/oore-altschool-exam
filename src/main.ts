import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import TodoDetail from './pages/TodoDetail.vue'
import ErrorPage from './components/common/ErrorPage.vue'
import ErrorTest from './pages/ErrorTest.vue'
import './index.css'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/todos/:id',
    component: TodoDetail,
    name: 'TodoDetail'
  },
  {
    path: '/error-test',
    component: ErrorTest,
    name: 'ErrorTest'
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    name: 'NotFound'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')