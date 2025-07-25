import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: "日月星辰",
  description: '明明天边月, 常照海中天',
  href: 'https://astro-erudite.vercel.app',
  author: 'Carlos',
  locale: 'zh-CN',
  recentPostCount: 3,
  pageSize: 10,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blogs',
    label: 'Blog',
  },
  {
    href: '/notes',
    label: 'Notes',
  },
  {
    href: '/tags',
    label: 'Tags',
  },
  {
    href: '/gallery',
    label: 'Photos',
  },
  {
    href: '/about',
    label: 'About',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/whappy233',
    label: 'GitHub',
  },
  // {
  //   href: 'https://twitter.com/enscry',
  //   label: 'Twitter',
  // },
  {
    href: 'mailto:carlos.wu.h@foxmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
