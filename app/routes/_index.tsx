import {
  type DataFunctionArgs,
  type MetaFunction,
  redirect
} from '@remix-run/node';
import { supabaseServer } from '../services/supbase';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ];
};

export async function loader({ request }: DataFunctionArgs) {
  const res = new Response();
  const {
    data: { session }
  } = await supabaseServer(request, res).auth.getSession();
  if (!session) {
    return redirect(`/auth#login?redirect=${request.url}`, {
      headers: res.headers
    });
  }
  return redirect('/my/dashboard', { headers: res.headers });
}

export default function Index() {
  return (
    <div
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
    ></div>
  );
}
