import * as React from 'react';
import { cn } from '../lib/Utils';

const alertVariants = {
  default: 'bg-background text-foreground',
  destructive:
    'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
};

function Alert({ className = '', variant = 'default', ...props }) {
  const baseClasses =
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground';
  const variantClasses = alertVariants[variant] || alertVariants.default;

  return (
    <div
      role="alert"
      className={cn(baseClasses, variantClasses, className)}
      {...props}
    />
  );
}

function AlertTitle({ className = '', ...props }) {
  return (
    <h5
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function AlertDescription({ className = '', ...props }) {
  return (
    <div
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
