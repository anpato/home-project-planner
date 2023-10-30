import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import DashboardZeroState from '~/routes/my/components/dashboard-zero-state';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const resp = new Response();
  const supabase = context.supabase(resp);

  const {
    data: { user = null }
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('board')
    .select()
    .order('updated_at', { ascending: false })
    .eq('admin_id', user?.id);

  return json({
    boards: data
  });
}

export default function Dashboard() {
  const { boards } = useLoaderData<typeof loader>();

  if (!boards?.length) {
    return <DashboardZeroState />;
  }

  return <div>This is dash</div>;
}
