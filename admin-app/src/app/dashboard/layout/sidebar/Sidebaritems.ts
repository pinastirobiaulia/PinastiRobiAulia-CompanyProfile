import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: any
  children?: ChildItem[]
  item?: any
  url?: any
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: any
  id?: number
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: any
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Dashboards',
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/dashboard",
        isPro: false
      },
    ]
  },
  {
    heading: 'Portfolio & Articles',
    children: [
      {
        id: uniqueId(),
        name: 'Artikel',
        icon: 'solar:notes-linear',
        url: '/dashboard/apps/article',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'Projects',
        icon: 'solar:ticker-star-linear',
        url: '/dashboard/apps/projects',
        isPro: false,
      },
    ],
  },

  {
    isPro: true,
    heading: "Auth",
    children: [
      {
        name: "Login",
        icon: "solar:login-2-linear",
        id: uniqueId(),
        url: "/auth/login",
        isPro: false
      },
      {
        name: "Register",
        icon: "solar:shield-user-outline",
        id: uniqueId(),
        url: "/auth/register",
        isPro: false
      },
      {
        id: uniqueId(),
        name: 'User Profile',
        icon: 'solar:user-circle-linear',
        url: '/dashboard/user-profile',
        isPro: false,
      },
    ],
  },
]

export default SidebarContent
