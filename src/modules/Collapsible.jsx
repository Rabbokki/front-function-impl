import React from 'react';
import {
  Root as CollapsiblePrimitive,
  CollapsibleTrigger as CollapsiblePrimitiveTrigger,
  CollapsibleContent as CollapsiblePrimitiveContent,
} from '@radix-ui/react-collapsible';

function Collapsible({ children, ...props }) {
  return <CollapsiblePrimitive {...props}>{children}</CollapsiblePrimitive>;
}

function CollapsibleTrigger({ children, ...props }) {
  return (
    <CollapsiblePrimitiveTrigger {...props}>
      {children}
    </CollapsiblePrimitiveTrigger>
  );
}

function CollapsibleContent({ children, ...props }) {
  return (
    <CollapsiblePrimitiveContent {...props}>
      {children}
    </CollapsiblePrimitiveContent>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
