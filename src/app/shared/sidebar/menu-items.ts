import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  
  {
    path: '',
    title: 'Dashboards',
    icon: 'mdi mdi-view-dashboard',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/dashboard/classic',
        title: 'Classic',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/analytical',
        title: 'Analytical',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/modern',
        title: 'Modern',
        icon: 'mdi mdi-adjust',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '/apps/email',
    title: 'Investimentos',
    icon: 'mdi mdi-cash-usd',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Saques',
    icon: 'mdi mdi-cash',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/apps/ticketlist',
        title: 'Ticket List',
        icon: 'mdi mdi-book-multiple',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/ticketdetails',
        title: 'Ticket Details',
        icon: 'mdi mdi-book-plus',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Rede',
    icon: 'mdi mdi-account-network',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/apps/chat',
        title: 'Chat App',
        icon: 'mdi mdi-comment-processing-outline',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/fullcalendar',
        title: 'Calendar',
        icon: 'mdi mdi-calendar',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/taskboard',
        title: 'Taskboard',
        icon: 'mdi mdi-bulletin-board',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Configurações',
    icon: 'mdi mdi-settings',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/apps/chat',
        title: 'Chat App',
        icon: 'mdi mdi-comment-processing-outline',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/fullcalendar',
        title: 'Calendar',
        icon: 'mdi mdi-calendar',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/apps/taskboard',
        title: 'Taskboard',
        icon: 'mdi mdi-bulletin-board',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },

];
