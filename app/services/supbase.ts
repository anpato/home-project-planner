import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/auth-helpers-remix';
const { SUPABASE_URL = '', SUPABASE_KEY = '' } = process.env;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true
  }
});

export const supabaseServer = (request: Request, response: Response) => {
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    request,
    response
  });
};
