import { type LoaderFunctionArgs, json } from '@remix-run/node';

export async function rootLoader({ request, context }: LoaderFunctionArgs) {
  const response = new Response();
  const { SUPABASE_URL = '', SUPABASE_KEY = '' } = process.env;

  const { data } = await context.supabase(response).auth.getSession();
  const env = {
    SUPABASE_KEY,
    SUPABASE_URL
  };

  return json(
    {
      env,
      session: data.session
    },
    { headers: response.headers }
  );
}
