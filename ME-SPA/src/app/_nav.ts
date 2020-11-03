import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name:'User',
    url: "/maintenance/user",
    icon: 'icon-user'
  },
  {
    name: 'Brand',
    url: '/maintenance/brand',
    icon: 'icon-layers',
  },
  {
    name: 'Audit Type',
    url: '/maintenance/audit-type',
    icon: 'icon-list'
  },
  {
    name: 'Audit Type D',
    url: '/maintenance/audit-type-d',
    icon: 'icon-list'
  },
 
];
