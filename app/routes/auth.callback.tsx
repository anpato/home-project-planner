import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

import { supabaseServer } from '~/services/supbase';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (code) {
    await supabaseServer(request, response).auth.exchangeCodeForSession(code);
  }

  return redirect('/', {
    status: 303,
    headers: response.headers
  });
};

export default function Callback() {}
