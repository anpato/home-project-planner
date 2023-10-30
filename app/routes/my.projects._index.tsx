import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { checkAuthorizationStatus } from '~/services/auth';

export async function loader({ request, context }: LoaderFunctionArgs) {
  await checkAuthorizationStatus(context, request);

  return json({});
}

export default function Index() {
  // const { user = null } = useLoaderData<typeof loader>();

  return <>Projects</>;
}
