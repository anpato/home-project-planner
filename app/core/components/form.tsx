import type { FC } from 'react';
import type { FormField } from '~/types/forms';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Form } from '@remix-run/react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

type IProps = {
  title: string;
  action: 'login' | 'register';
  fields: FormField[];
  redirect: string;
};

export const TabForm: FC<IProps> = ({ title, fields, action, redirect }) => {
  const actionURL = redirect
    ? `?action=${action}&redirect=${redirect}`
    : `?action=${action}`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" action={actionURL}>
          {fields.map((f) => (
            <div key={f.label} className="my-4">
              <Label htmlFor={f.name}>{f.label}</Label>
              <Input
                name={f.name}
                placeholder={f.placeholder}
                type={f.type ?? f.name}
                required={f.required}
                // value={f.value}
              />
            </div>
          ))}

          <Button aria-selected="false" className="w-full">
            Log In
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
