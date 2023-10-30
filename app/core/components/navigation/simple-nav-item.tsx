import { Link, type Location } from '@remix-run/react';
import {
  navigationMenuTriggerStyle,
  NavigationMenuItem
} from '~/components/ui/navigation-menu';
import type { NavigationItem } from '../../../types/navigation';

export default function RenderSimpleNavItem({
  item,
  location
}: {
  item: NavigationItem;
  location: Location;
}) {
  return (
    <NavigationMenuItem aria-disabled={location.pathname === item.href}>
      <Link className={navigationMenuTriggerStyle()} to={item.href}>
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
}
