import { useNavigate, useOutletContext } from '@remix-run/react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useCallback, useEffect } from 'react';

export default function Logout() {
  const navigation = useNavigate();
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();

  const handleLogOut = useCallback(async () => {
    await supabase.auth.signOut();
    navigation('/auth');
  }, [supabase.auth, navigation]);

  useEffect(() => {
    handleLogOut();
  }, [handleLogOut]);
  return <div></div>;
}
