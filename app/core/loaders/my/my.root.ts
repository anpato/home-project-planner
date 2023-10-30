import { type LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { checkAuthorizationStatus } from '~/services/auth';

export async function myRootLoader({ request, context }: LoaderFunctionArgs) {
  const res = new Response();
  const { session = null } = await checkAuthorizationStatus(context, res);
  console.log(session);
  const url = new URL(request.url);
  if (!session) {
    throw redirect(`/auth?redirect=${url.pathname}#login`);
  }
  if (url.pathname === '/my' || url.pathname === '/my/') {
    throw redirect('/my/dashboard');
  }
  return json({
    user: session?.user
  });
}
