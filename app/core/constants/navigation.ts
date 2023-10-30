import type { NavigationItem } from '~/types/navigation';

export const navigationItems: NavigationItem[] = [
  { title: 'Home', href: '/my/dashboard' },
  {
    title: 'Projects',
    href: '/my/projects',
    children: [
      {
        title: 'Create a new project',
        href: '/my/projects/new',
        children: 'Get started with planning out your next project!'
      },
      {
        title: 'View your projects',
        href: '/my/projects',
        children: 'View all of your current, past and shared projects.'
      }
    ]
  }
];

export const dropdownItems: NavigationItem[] = [
  { title: 'Settings', href: '/my/settings' },
  { title: 'Invitations', href: '#invitations' },
  { title: '{SEPARATOR}', href: '', isSeparator: true },
  { title: 'Sign out', href: '/logout' }
];
