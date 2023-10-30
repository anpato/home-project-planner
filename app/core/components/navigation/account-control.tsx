import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '~/components/ui/dropdown-menu';
import { Link } from '@remix-run/react';
import { dropdownItems } from '~/core/constants/navigation';
import { Helpers } from '~/core/helpers';
import type { User } from '@supabase/supabase-js';
import { useTheme } from '~/utils/theme-provider';
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import { MoonIcon, SunIcon } from 'lucide-react';

type IProps = {
  user: User | null;
};

export default function AccountControl({ user }: IProps) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="theme-toggle"
          checked={theme === 'light'}
          onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <Label htmlFor="theme-toggle">
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </Label>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {user?.email?.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <p className="text-muted-foreground">
                {Helpers.uppercaseFirstLetter(user?.email)}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {dropdownItems.map((item) =>
              item.isSeparator ? (
                <DropdownMenuSeparator key={item.title} />
              ) : (
                <DropdownMenuItem key={item.title}>
                  <Link to={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
