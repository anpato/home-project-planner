import { json, type ActionFunctionArgs, redirect } from '@remix-run/node';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TabForm } from '~/core/components/form';
import {
  useActionData,
  useLocation,
  useNavigate,
  useSearchParams
} from '@remix-run/react';
import { useEffect } from 'react';
import { useToast } from '~/components/ui/use-toast';

export async function action({ request, context }: ActionFunctionArgs) {
  const url = new URL(request.url);

  const formAction = url.searchParams.get('action');
  const redirectUrl = url.searchParams.get('redirect');

  const body = await request.formData();

  const email = body.get('email') as string;
  const password = body.get('password') as string;
  const response = new Response();
  const subabase = context.supabase(response);
  if (formAction === 'register') {
    if (
      body.get('confirmPassword') &&
      body.get('confirmPassword') !== password
    ) {
      return json({
        hash: `${formAction}`,
        isError: true,
        message: 'Unable to register your account.',
        error: 'Passwords did not match.'
      });
    }

    const { error = null } = await subabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return json({
        hash: `#${formAction}`,
        isError: true,
        message: 'Unable to register your account.',
        error: error.message
      });
    }

    if (redirectUrl) {
      return redirect(redirectUrl, { status: 302 });
    }
    return json({
      hash: `#login`,
      isError: false,
      error: '',
      message: 'Account Created Successfully'
    });
  }

  const { data, error } = await subabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return json({
      hash: '',
      isError: true,
      error: error.message,
      message: 'Unable to sign in.'
    });
  }

  await subabase.auth.setSession({ ...data.session });

  if (redirectUrl) {
    return redirect(redirectUrl, {
      headers: response.headers
    });
  }
  return redirect(`/my/dashboard`, {
    headers: response.headers
  });
}

export default function Auth() {
  const data = useActionData<typeof action>();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const redirectRoute = searchParams.get('redirect') ?? '';
  const currHash = location.hash.split('?')[0];

  useEffect(() => {
    if (!location.hash) {
      navigate({ hash: '#login' });
    }

    if (data?.hash) {
      navigate({ hash: data.hash });
    }
  }, [location.hash, navigate, data?.hash]);

  useEffect(() => {
    if (data?.isError) {
      toast({ title: data?.message, description: data?.error });
    }
    if (data?.message && !data.isError) {
      toast({ title: 'Success', description: data?.message });
    }
  }, [data?.isError, data?.message, data?.error, toast]);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Tabs
        onValueChange={(e) => navigate({ hash: `#${e}` })}
        defaultValue="login"
        className="w-3/6"
        value={currHash.replace('#', '')}
      >
        <TabsList>
          <TabsTrigger value="login">Sign In</TabsTrigger>
          <TabsTrigger value="register">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <TabForm
            redirect={redirectRoute}
            title="Sign In"
            action="login"
            fields={[
              {
                name: 'email',
                placeholder: 'Example@mail.com',
                required: true,
                label: 'Email'
              },
              {
                name: 'password',
                placeholder: '••••••',
                required: true,
                label: 'Password'
              }
            ]}
          />
        </TabsContent>
        <TabsContent value="register">
          <TabForm
            redirect='"'
            title="Sign Up"
            action="register"
            fields={[
              {
                name: 'email',
                placeholder: 'Example@mail.com',
                required: true,
                label: 'Email'
              },
              {
                name: 'password',
                placeholder: '••••••',
                required: true,
                label: 'Password'
              },
              {
                name: 'confirmPassword',
                placeholder: '••••••',
                label: 'Confirm Password',
                required: true,
                type: 'password'
              }
            ]}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
