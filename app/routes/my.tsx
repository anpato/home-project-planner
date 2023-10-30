import { Outlet, useLoaderData } from '@remix-run/react';
import { Separator } from '~/components/ui/separator';
import NavBar from '~/core/components/navigation/nav';
import AccountControl from '~/core/components/navigation/account-control';
import { myRootLoader } from '~/core/loaders/my/my.root';

export { myRootLoader as loader };

export default function Index() {
  const { user = null } = useLoaderData<typeof myRootLoader>();

  return (
    <>
      <NavBar>
        <AccountControl user={user} />
      </NavBar>
      <Separator />
      <main className="max-w-screen-2xl m-auto my-4 p-4">
        <Outlet />
      </main>
    </>
  );
}
