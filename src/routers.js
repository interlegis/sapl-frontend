
export const routes = [
  {
    path: '/online/',
    component: () => import('@/layouts/OnlineLayout'),
    children: [
      { path: '', name: 'index_link', component: () => import('@/pages/Index.vue') },
      { path: 'sessao', name: 'sessao_link', component: () => import('@/pages/sessao/SessaoPlenaria.vue') }
    ]
  }
]
