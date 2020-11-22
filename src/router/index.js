import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/layout/App'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

import Articles from '@/components/article/Articles'
import ArticlesIndex from '@/components/article/Index'
import ViewArticle from '@/components/article/View'
import CreateArticle from '@/components/article/Create'
import EditArticle from '@/components/article/Edit'
import TrashedArticles from '@/components/article/Trash'
import {auth, guest, log} from '../middleware/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            middleware: [log]
          }
        }, {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            middleware: [guest, log]
          }
        }, {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
            middleware: [guest, log]
          }
        }, {
          path: '/articles',
          component: Articles,
          children: [
            {
              path: '',
              component: ArticlesIndex,
              name: 'articles',
              meta: {
                middleware: [auth, log]
              }
            }, {
              path: 'create',
              component: CreateArticle,
              name: 'create_article',
              meta: {
                middleware: [auth, log]
              }
            }, {
              path: 'trash',
              component: TrashedArticles,
              name: 'articles_trash',
              meta: {
                middleware: [auth, log]
              }
            }, {
              path: 'edit/:id',
              component: EditArticle,
              name: 'edit_article',
              meta: {
                middleware: [auth, log]
              }
            }, {
              path: 'view/:id',
              component: ViewArticle,
              name: 'view_article',
              meta: {
                middleware: [auth, log]
              }
            }
          ]
        }
      ]
    }

  ]
})
