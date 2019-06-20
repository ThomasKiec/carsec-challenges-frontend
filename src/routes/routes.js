import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserProfile from '@/pages/UserProfile.vue'
import Typography from '@/pages/Typography.vue'
import Icons from '@/pages/Icons.vue'
import News from '@/pages/News.vue'
import UpgradeToPRO from '@/pages/UpgradeToPRO.vue'
import Logout from '@/pages/Logout.vue'
import ChallengesList from '@/pages/ChallengesList.vue'

const routes = [
    {
        path: '/',
        component: DashboardLayout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'user',
                name: 'User Profile',
                component: UserProfile,
            },
            {
                path: 'challenges',
                name: 'Challenges',
                component: ChallengesList,
            },
            {
                path: 'typography',
                name: 'Typography',
                component: Typography,
            },
            {
                path: 'icons',
                name: 'Icons',
                component: Icons,
            },
            {
                path: 'news',
                name: 'News',
                component: News,
            },
            {
                path: 'upgrade',
                name: 'Upgrade to PRO',
                component: UpgradeToPRO,
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
