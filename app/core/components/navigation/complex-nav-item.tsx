import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from '~/components/ui/navigation-menu';
import type { NavigationItem } from '~/types/navigation';
import { Link, type Location } from '@remix-run/react';
import { forwardRef } from 'react';
import { cn } from '~/lib/utils';

const ListItem = forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref as any}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        to={href ?? ''}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  );
});

ListItem.displayName = 'ListItem';

export default function RenderComplexNavItem({
  item
}: {
  item: NavigationItem;
  location: Location;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
      <NavigationMenuContent className="mx-4">
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            {item.children?.map((child) => (
              <ListItem
                key={child.title}
                href={child.href}
                title={child.title}
                children={child.children}
              />
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
