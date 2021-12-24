import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage'
import HomePage from '../views/Home/HomePage'
import Tweet from '../views/Home/Tweet'
import Recruitment from '../views/Home/Recruitment'
import RecruitmentDetailPage from '../views/RecruitmentDetailPage'
import UserInfoPage from '../views/UserInfo/UserInfoPage'
import UserTweet from '../views/UserInfo/UserTweet'
import UserHome from '../views/UserInfo/UserHome'
import ModifyUserInfo from '../views/ModifyUserInfo'
import ModifyCompanyInfo from '../views/ModifyCompanyInfo'
import CompanyInfoPage from '../views/CompanyInfo/CompanyInfoPage'
import CompanyHome from '../views/CompanyInfo/CompanyHome'
import CompanyDescription from '../views/CompanyInfo/CompanyDescription'
import CompanyTweet from '../views/CompanyInfo/CompanyTweet'
import CompanyRecruitment from '../views/CompanyInfo/CompanyRecruitment'
import MyInfoPage from '../views/MyInfoPage'
import Search from '../views/Home/Search'
import PostRecruitmentPage from '../views/PostRecruitmentPage'
import RegisterPage from '../views/RegisterPage'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },

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
    path: '/userhomepage/:uid',
    name: 'userinfo',
    component: UserInfoPage,
    redirect: { name: '/userinfo/:uid/home' },
    children: [
      { path: 'home', name:'/userinfo/:uid/home', component: UserHome },
      { path: 'tweets', component: UserTweet },
    ]
  },
  { 
    path: '/companyinfo/:cid',
    name: 'companyinfo',
    component: CompanyInfoPage,
    redirect: { name: '/companyinfo/:cid/home' },
    children: [
      { path: 'home', name:'/companyinfo/:cid/home', component: CompanyHome },
      { path: 'description', component: CompanyDescription },
      { path: 'tweets', component: CompanyTweet },
      { path: 'recruitments', component: CompanyRecruitment }
    ]
  },
  {
    path: '/postRecruitment',
    name: 'postRecruitment',
    component: PostRecruitmentPage
  },
  {
    path: '/modifyUserInfo/:uid',
    name: 'modifyUserInfo',
    component: ModifyUserInfo
  },
  {
    path: '/modifyCompanyInfo/:cid',
    name: 'modifyCompanyInfo',
    component: ModifyCompanyInfo
  },
  { path: '/companyInfo/:cid',
  name: 'companyinfo',
  component: CompanyInfoPage,
  children: [
    { path: 'companyHome', component: CompanyHome},
    { path: 'companyDescription', component: CompanyDescription },
    { path: 'companyTweet', component: CompanyTweet },
    { path: 'companyRecruitment', component: CompanyRecruitment }
  ]
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
