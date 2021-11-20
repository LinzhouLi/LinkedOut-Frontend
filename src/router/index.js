import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'
import HomePage from '../views/Home/HomePage'
import Tweet from '../views/Home/Tweet'
import Recruitment from '../views/Home/Recruitment'
import RecruitmentDetailPage from '../views/RecruitmentDetailPage'
import UserInfoPage from '../views/UserInfoPage'
import CompanyInfoPage from '../views/CompanyInfoPage'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/home',
    component: HomePage,
    children: [
      { path: '/tweets', component: Tweet },
      { path: '/recruitments', component: Recruitment },
    ]
  },
  { path: '/recruitemnt/:rid', component: RecruitmentDetailPage},
  { path: '/userinfo/:uid', component: UserInfoPage },
  { path: '/companyinfo/:cid', component: CompanyInfoPage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
