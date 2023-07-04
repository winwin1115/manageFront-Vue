import { mdiHomeOutline, mdiMicrosoftTeams, mdiArchiveOutline, mdiCardAccountDetailsStarOutline, mdiChartBoxOutline } from '@mdi/js'

export default [
  {
    title: 'ダッシュボード',
    icon: mdiHomeOutline,
    to: 'demo-dashboard'
  },
  {
    title: 'プロジェクト',
    icon: mdiArchiveOutline,
    to: 'demo-project'
  },
  {
    title: 'チーム',
    icon: mdiMicrosoftTeams,
    to: 'demo-team'
  },
  {
    title: '開発者',
    icon: mdiCardAccountDetailsStarOutline,
    to: 'demo-developer'
  },
  {
    title: 'スプリント',
    icon: mdiChartBoxOutline,
    to: 'demo-sprint'
  }
]
