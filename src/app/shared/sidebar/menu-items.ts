import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  
  {
    path: '',
    title: 'MENU.DASHBOARD.TITLE',
    icon: 'mdi mdi-view-dashboard',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'MENU.INVESTMENTS.TITLE',
    icon: 'mdi mdi-cash-usd',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/investiments/create',
        title: 'MENU.INVESTMENTS.SUBMENU.CREATE',
        icon: 'mdi mdi-library-plus',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/ticketlist',
        title: 'MENU.INVESTMENTS.SUBMENU.HISTORIC',
        icon: 'mdi mdi-history',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENU.WITHDRAWALS.TITLE',
    icon: 'mdi mdi-cash',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/apps/ticketlist',
        title: 'MENU.WITHDRAWALS.SUBMENU.WITHDRAW',
        icon: 'mdi mdi-clipboard-arrow-left',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/ticketdetails',
        title: 'MENU.WITHDRAWALS.SUBMENU.WITHDRAWALREPORT',
        icon: 'mdi mdi-receipt',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/ticketdetails',
        title: 'MENU.WITHDRAWALS.SUBMENU.WALLET',
        icon: 'mdi mdi-wallet',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'MENU.NETWORK.TITLE',
    icon: 'mdi mdi-account-network',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/apps/chat',
        title: 'MENU.NETWORK.SUBMENU.TEAM',
        icon: 'mdi mdi-account-multiple',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/fullcalendar',
        title: 'MENU.NETWORK.SUBMENU.RESIDUAL',
        icon: 'mdi mdi-clock-in',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/taskboard',
        title: 'MENU.NETWORK.SUBMENU.BONUS',
        icon: 'mdi mdi-wallet-giftcard',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },

];
