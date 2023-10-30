import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { checkAuthorizationStatus } from '../services/auth';
import { useLoaderData } from '@remix-run/react';
import DashboardZeroState from '~/routes/my/components/dashboard-zero-state';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const { session } = await checkAuthorizationStatus(context, request);
  const response = new Response();
  const { data } = await context
    .supabase(response)
    .from('board')
    .select()
    .order('updated_at', { ascending: false })
    .eq('admin_id', session?.user.id);

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
