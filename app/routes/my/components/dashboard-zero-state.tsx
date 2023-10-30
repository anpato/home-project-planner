import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';

export default function DashboardZeroState() {
  const emptyStateItems = new Array(8)
    .fill(() => {})
    .map((_, i) => <Skeleton key={i} className="w-[200px] h-[200px]" />);

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="underline">Hey there!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-center items-center">
        <div className="w-1/2 text-center">
          <h3>It looks like you don't have any projects to work on.</h3>
          <br />

          <Link to="/my/projects/new">
            <Button>Click here to get started.</Button>
          </Link>
        </div>
        <Separator />
        <div className=" my-4 grid grid-cols-4 gap-8">{emptyStateItems}</div>
      </CardContent>
    </Card>
  );
}
