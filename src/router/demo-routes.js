const demos = [
  {
    path: '/demo/dashboard',
    name: 'demo-dashboard',
    component: () => import('@/views/demo/dashboard/index.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/project',
    name: 'demo-project',
    component: () => import('@/views/demo/project/index.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/project/view/:id',
    name: 'demo-project-view',
    component: () => import('@/views/demo/project/DemoProjectDetails.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/team',
    name: 'demo-team',
    component: () => import('@/views/demo/team/index.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/team/view/:id',
    name: 'demo-team-view',
    component: () => import('@/views/demo/team/DemoTeamDetails.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/developer',
    name: 'demo-developer',
    component: () => import('@/views/demo/developer/index.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/developer/view/:id',
    name: 'demo-developer-view',
    component: () => import('@/views/demo/developer/DemoDevDetails.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/sprint',
    name: 'demo-sprint',
    component: () => import('@/views/demo/sprint/index.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/demo/sprint/view/:id',
    name: 'demo-sprint-view',
    component: () => import('@/views/demo/sprint/sprint.vue'),
    meta: {
      layout: 'content',
    },
  },
]

export default demos
