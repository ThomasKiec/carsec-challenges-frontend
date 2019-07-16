import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

// import Dashboard from '@/pages/Dashboard.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserProfile from '@/pages/UserProfile.vue'
import News from '@/pages/News.vue'
import Logout from '@/pages/Logout.vue'
import ChallengesList from '@/pages/ChallengesList.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/user',
    children: [
      {
        path: 'challenges',
        name: 'Challenges',
        component: ChallengesList,
      },
      {
        path: 'user',
        name: 'Profile',
        component: UserProfile,
      },

      {
        path: 'news',
        name: 'News',
        component: News,
      },
      {
        path: 'logout',
        name: 'Logout',
        meta: {
          hideFooter: true,
        },
        component: Logout,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
]

export default routes
