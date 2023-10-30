import type { ReactNode } from 'react';

export type NavigationItem = {
  title: string;
  href: string;
  children?: NavigationItemChild[];
  isSeparator?: boolean;
};

export type NavigationItemChild = Omit<NavigationItem, 'children'> & {
  children?: ReactNode | string;
};
