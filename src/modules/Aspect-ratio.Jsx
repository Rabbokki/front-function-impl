import React from 'react';
import { AspectRatio as AspectRatioRoot } from '@radix-ui/react-aspect-ratio';

function AspectRatio({ children, ...props }) {
  return <AspectRatioRoot {...props}>{children}</AspectRatioRoot>;
}

export { AspectRatio };
