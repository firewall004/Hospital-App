// TODO: Update the roles along with the pages middleware
export const leftSideBarMenuItems = [
  {
    icon: 'mdi-home',
    title: 'Home',
    to: '/admin',
    roles: ['admin'],
  },
  {
    icon: 'mdi-account-plus',
    title: 'New Member',
    to: '/admin/new-member/add-staff',
    subItems: [
      { title: 'Add admin', icon: 'mdi-account-wrench', to: '/admin/new-member/add-admin' },
      { title: 'Add doctor', icon: 'mdi-doctor', to: '/admin/new-member/add-doctor' },
      { title: 'Add manager', icon: 'mdi-account-supervisor', to: '/admin/new-member/add-manager' },
      { title: 'Add staff', icon: 'mdi-account-star', to: '/admin/new-member/add-staff' },
      { title: 'Add machine', icon: 'mdi-tools', to: '/admin/new-member/add-machine' },
    ],
    roles: ['admin'],
  },
  {
    icon: 'mdi-office-building',
    title: 'Micro-center',
    to: '/admin/micro-center/resources',
    subItems: [
      { title: 'Add new microcenter', icon: 'mdi-office-building-marker', to: '/admin/micro-center/add' },
      { title: 'Manage microcenter', icon: 'mdi-office-building-cog', to: '/admin/micro-center/manage' },
      { title: 'See resources', icon: 'mdi-sitemap-outline', to: '/admin/micro-center/resources' },
    ],
    roles: ['admin'],
  },
  {
    icon: 'mdi-chart-timeline-variant-shimmer',
    title: 'Statistics',
    to: '/admin/statistics/machine-runtime',
    subItems: [
      { title: 'Machine runtime', icon: 'mdi-chart-histogram', to: '/admin/statistics/machine-runtime' },
      { title: 'Staff info', icon: 'mdi-account-eye-outline', to: '/admin/statistics/staff-info' },
      { title: 'Patient info', icon: 'mdi-account-eye', to: '/admin/statistics/patient-info' },
      {
        title: 'Appointment info',
        icon: 'mdi-account-box-multiple-outline',
        to: '/admin/statistics/appointment-info',
      },
      { title: 'Business info', icon: 'mdi-chart-areaspline', to: '/admin/statistics/business-info' },
    ],
    roles: ['admin'],
  },
  {
    icon: 'mdi-account-box-multiple',
    title: 'Employee management',
    to: '/admin/employee-management',
    roles: ['admin'],
  },
  {
    icon: 'mdi-chart-scatter-plot',
    title: 'Stock maintenance',
    to: '/admin/stock-maintenance/manage-stock',
    subItems: [
      { title: 'Add new product', icon: 'mdi-bottle-tonic-plus', to: '/admin/stock-maintenance/add-new-product' },
      { title: 'Add stock', icon: 'mdi-server-plus', to: '/admin/stock-maintenance/add-stock' },
      { title: 'Manage stock', icon: 'mdi-server', to: '/admin/stock-maintenance/manage-stock' },
    ],
    roles: ['admin'],
  },
  {
    icon: 'mdi-clipboard-file',
    title: 'Reports',
    to: '/admin/reports',
    roles: ['admin'],
  },
  {
    icon: 'mdi-home-thermometer',
    title: 'Home Dialysis',
    to: '/admin/home-dialysis/statistics',
    subItems: [
      { title: 'Create home dialysis', icon: 'mdi-home-map-marker', to: '/admin/home-dialysis/create' },
      { title: 'Manage home dialysis', icon: 'mdi-home-automation', to: '/admin/home-dialysis/manage' },
      { title: 'Statistics', icon: 'mdi-home-analytics', to: '/admin/home-dialysis/statistics' },
    ],
    roles: ['admin'],
  },
  {
    icon: 'mdi-history',
    title: 'Activity log',
    to: '/user/activity-log',
    roles: ['admin'],
  },
  {
    icon: 'mdi-home',
    title: 'Dashboard',
    to: '/staff/',
    roles: ['staff'],
  },

  {
    icon: 'mdi-hospital-building',
    title: 'View Branch',
    to: '/staff/view-branch',
    roles: ['staff'],
  },
  {
    icon: 'mdi-account-eye',
    title: 'Manage Patient',
    to: '/staff/manage-patient',
    roles: ['staff'],
  },
  {
    icon: 'mdi-file-chart-outline',
    title: 'Blood Report',
    to: '/staff/blood-report',
    roles: ['staff'],
  },
  {
    icon: 'mdi-home-analytics',
    title: 'Home Dialysis',
    to: '/staff/home-dialysis',
    roles: ['staff'],
  },
  {
    icon: 'mdi-needle',
    title: 'Telemedicine',
    to: '/staff/telemedicine',
    roles: ['staff'],
  },
  {
    icon: 'mdi-clipboard-off-outline',
    title: 'Offline Record',
    to: '/staff/offline-record',
    roles: ['staff'],
  },
  {
    icon: 'mdi-hospital-building',
    title: 'Home',
    to: '/doctor/',
    roles: ['doctor'],
  },
  {
    icon: 'mdi-file-document-edit-outline',
    title: 'Daily Reports',
    to: '/doctor/daily-reports',
    roles: ['doctor'],
  },
  {
    icon: 'mdi-prescription',
    title: 'Prescription',
    to: '/doctor/prescription',
    roles: ['doctor'],
  },
  {
    icon: 'mdi-clipboard-file',
    title: 'Reports',
    to: '/doctor/reports',
    roles: ['doctor'],
  },
]
