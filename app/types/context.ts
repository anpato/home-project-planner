import type { supabaseServer } from '~/services/supbase';

export interface LoadContext {
  supabase: (res: Response) => ReturnType<typeof supabaseServer>;
}
