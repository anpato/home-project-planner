import {
  NavigationMenu,
  NavigationMenuList
} from '~/components/ui/navigation-menu';
import RenderSimpleNavItem from '~/core/components/navigation/simple-nav-item';
import RenderComplexNavItem from '~/core/components/navigation/complex-nav-item';
import { useLocation } from '@remix-run/react';
import { cn } from '~/lib/utils';
import type { ReactNode } from 'react';
import { navigationItems } from '~/core/constants/navigation';

type IProps = {
  children: ReactNode;
};

export default function NavBar({ children }: IProps) {
  const location = useLocation();
  return (
    <NavigationMenu
      className={cn('max-w-[100%] py-2 px-2 flex flex-row justify-between ')}
    >
      <NavigationMenuList>
        {navigationItems.map((l) =>
          l.children ? (
            <RenderComplexNavItem key={l.title} item={l} location={location} />
          ) : (
            <RenderSimpleNavItem key={l.title} item={l} location={location} />
          )
        )}
      </NavigationMenuList>
      {children}
    </NavigationMenu>
  );
}
