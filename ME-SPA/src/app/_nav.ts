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
    icon: 'icon-screen-tablet'
  },
  {
    name: 'Audit Pic M',
    url: '/maintenance/audit-pic-m',
    icon: 'icon-notebook'
  },
  {
    name: 'Audit Pic D',
    url: '/maintenance/audit-pic-d',
    icon: 'icon-notebook'
  },
  {
    name: 'WT Tracking List',
    url: '/maintenance/audit-rec',
    icon: 'icon-eyeglass'
  },
  {
    name: 'SME Score Record',
    url: '/maintenance/sme-score-record',
    icon: 'icon-eyeglass'
  },
  {
    name: '6S Score Record',
    url: '/maintenance/6s-score-record',
    icon: 'icon-eyeglass'
  }
 
];
