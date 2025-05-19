
import React from 'react';
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from '../lib/Utils';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
  <ProgressPrimitive.Indicator
    className="h-full bg-blue-500 transition-all"
    style={{ width: `${value}%` }}
  />

  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
