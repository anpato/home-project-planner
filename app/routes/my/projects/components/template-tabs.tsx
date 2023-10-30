import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Helpers } from '~/core/helpers';
import type { TemplateOption } from '~/types/templates';

export default function TemplateTabs({
  options
}: {
  options: TemplateOption[];
}) {
  return (
    <Tabs defaultValue={options[0].key}>
      <TabsList>
        {options.map((opt) => (
          <TabsTrigger key={opt.key} value={opt.key} name="template">
            {Helpers.uppercaseFirstLetter(opt.key)}
          </TabsTrigger>
        ))}
      </TabsList>

      {options.map(({ Templates, key }) => (
        <TabsContent value={key} key={key}>
          <Card>
            <CardHeader></CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <Templates.Example />
            </CardContent>
            <CardFooter />
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
