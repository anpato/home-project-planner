import { type AppLoadContext } from '@remix-run/node';
import type { Session } from '@supabase/supabase-js';

export const checkAuthorizationStatus = async (
  ctx: AppLoadContext,
  res: Response
): Promise<{ session: Session | null }> => {
  const supabase = ctx.supabase(res);
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      return {
        session: null
      };
    }
    return {
      session: data.session
    };
  } catch (error) {
    await supabase.auth.signOut();
    return {
      session: null
    };
  }
};
