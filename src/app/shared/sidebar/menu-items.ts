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
        path: '/investiments/historic',
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
        path: '/loot/withdraw',
        title: 'MENU.WITHDRAWALS.SUBMENU.WITHDRAW',
        icon: 'mdi mdi-clipboard-arrow-left',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/loot/report',
        title: 'MENU.WITHDRAWALS.SUBMENU.WITHDRAWALREPORT',
        icon: 'mdi mdi-receipt',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/loot/wallet',
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
        path: '/network/team',
        title: 'MENU.NETWORK.SUBMENU.TEAM',
        icon: 'mdi mdi-account-multiple',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/network/residual',
        title: 'MENU.NETWORK.SUBMENU.RESIDUAL',
        icon: 'mdi mdi-clock-in',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/network/bonus',
        title: 'MENU.NETWORK.SUBMENU.BONUS',
        icon: 'mdi mdi-wallet-giftcard',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },

];
