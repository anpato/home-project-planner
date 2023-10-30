import { type LoaderFunctionArgs, json } from '@remix-run/node';

import { checkAuthorizationStatus } from '~/services/auth';

export async function rootLoader({ request, context }: LoaderFunctionArgs) {
  const response = new Response();
  const { SUPABASE_URL = '', SUPABASE_KEY = '' } = process.env;
  const { session = null } = await checkAuthorizationStatus(
    context,
    request,
    response
  );
  const env = {
    SUPABASE_KEY,
    SUPABASE_URL
  };

  return json(
    {
      env,
      session
    },
    { headers: response.headers }
  );
}
