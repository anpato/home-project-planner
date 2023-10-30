import type { ReactElement } from 'react';

export type TemplateOption = {
  key: string;
  Templates: {
    Example: () => ReactElement;
  };
};
