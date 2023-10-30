import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';

type IProps = {
  scale?: number;
  size?: number;
  classNames?: string;
};

export default function Spinner({
  scale = 100,
  size = 40,
  classNames
}: IProps) {
  return (
    <Loader2
      id="spinner"
      className={cn(['animate-spin', classNames])}
      scale={scale}
      width={size}
      height={size}
    />
  );
}
