import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'
import HomePage from '../views/Home/HomePage'
import Tweet from '../views/Home/Tweet'
import Recruitment from '../views/Home/Recruitment'
import RecruitmentDetailPage from '../views/RecruitmentDetailPage'
import UserInfoPage from '../views/UserInfoPage'
import CompanyInfoPage from '../views/CompanyInfo/CompanyInfoPage'
import CompanyHome from '../views/CompanyInfo/CompanyHome'
import CompanyDescription from '../views/CompanyInfo/CompanyDescription'
import CompanyTweet from '../views/CompanyInfo/CompanyTweet'
import CompanyRecruitment from '../views/CompanyInfo/CompanyRecruitment'
import MyInfoPage from '../views/MyInfoPage'
import Search from '../views/Home/Search'
import PostRecruitmentPage from '../views/PostRecruitmentPage'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/home',
    component: HomePage,
    children: [
      { path: '', redirect: '/home/tweets'},
      { path: 'tweets', component: Tweet },
      { path: 'recruitments', component: Recruitment },
      { path: 'search', name: 'search', component: Search }
    ]
  },
  { path: '/myinfo', component: MyInfoPage},
  { 
    path: '/recruitment/:rid',
    name: 'recruitment',
    component: RecruitmentDetailPage
  },
  { 
    path: '/userinfo/:uid',
    name: 'userinfo',
    component: UserInfoPage
  },
  { 
    path: '/companyInfo/:cid',
    name: 'companyinfo',
    component: CompanyInfoPage,
    redirect: { name: '/companyInfo/:cid/companyHome' },
    children: [
      { path: 'companyHome', name:'/companyInfo/:cid/companyHome', component: CompanyHome },
      { path: 'companyDescription', component: CompanyDescription },
      { path: 'companyTweet', component: CompanyTweet },
      { path: 'companyRecruitment', component: CompanyRecruitment }
    ]
  },
  {
    path: '/postRecruitment',
    name: 'postRecruitment',
    component: PostRecruitmentPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
