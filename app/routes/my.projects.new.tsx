import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import {
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode
} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';
import { Textarea } from '~/components/ui/textarea';
import PictureTemplates from '~/core/templates/pictures.template';
import PricingTemplates from '~/core/templates/pricing.template';

import { cn } from '~/lib/utils';
import TemplateTabs from '~/routes/my/projects/components/template-tabs';
import type { TemplateOption } from '~/types/templates';

export async function loader({ request, context }: LoaderFunctionArgs) {
  // await checkAuthorizationStatus(context, request);
  return json({});
}

function FormField({
  labelProps: { content, ...rest },
  inputProps = {},
  classNames,
  useTextArea,
  render
}: {
  inputProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    inputClasses?: string[];
  };
  labelProps: LabelHTMLAttributes<HTMLLabelElement> & {
    content: string;
    labelClasses?: string[];
  };
  classNames?: string[];
  useTextArea?: boolean;
  render?: () => ReactNode;
}) {
  inputProps = {
    className: cn(inputProps.inputClasses),
    ...inputProps
  };

  if (render) {
    return (
      <div className={cn(['flex flex-col gap-4', classNames])}>
        <Label {...rest} className={cn(rest.labelClasses)}>
          {content}
        </Label>
        {render()}
      </div>
    );
  }

  return (
    <div className={cn(['flex flex-col gap-4', classNames])}>
      <Label {...rest} className={cn(rest.labelClasses)}>
        {content}
      </Label>
      {useTextArea ? <Textarea {...inputProps} /> : <Input {...inputProps} />}
    </div>
  );
}

const templateOptions: TemplateOption[] = [
  { key: 'pictures', Templates: { Example: PictureTemplates.Example } },
  { key: 'pricing', Templates: { Example: PricingTemplates.Example } }
];

export default function Index() {
  // const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Create a new project</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form className="p-4 my-2 flex flex-col gap-6">
          <FormField
            inputProps={{
              placeholder: 'Ex: Bedroom Remodel',
              name: 'name'
            }}
            labelProps={{
              htmlFor: 'name',
              content: 'Give your project a name'
            }}
          />
          <FormField
            useTextArea
            inputProps={{
              placeholder: "Ex: Add an accent wall and create built in's...",
              name: 'description'
            }}
            labelProps={{
              htmlFor: 'description',
              content: 'Describe your project'
            }}
          />
          <FormField
            labelProps={{
              htmlFor: 'template',
              content: 'Select a template'
            }}
            render={() => <TemplateTabs options={templateOptions} />}
          />
        </Form>
      </CardContent>
    </Card>
  );
}
