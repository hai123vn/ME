import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Brand',
    url: '/maintenance',
    icon: 'icon-layers',
    children: [
      {
        name: 'Add',
        url: '/maintenance/add',
        icon: 'icon-plus'
      },
      {
        name: 'Edit',
        url: '/maintenance/update',
        icon: 'icon-wrench'
      }
    ]
  },
];
