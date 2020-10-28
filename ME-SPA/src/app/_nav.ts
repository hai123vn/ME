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
    name: 'Brand',
    url: '/maintenance/brand',
    icon: 'icon-layers',
  },
  {
    name: 'Audit Type',
    url: '/maintenance/audit-type',
    icon: 'icon-list'
  }
];
