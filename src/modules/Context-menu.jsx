import React from 'react';
import {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  Group,
  Portal,
  Sub,
  SubTrigger,
  SubContent,
  ItemIndicator,
  RadioGroup,
} from '@radix-ui/react-context-menu';

import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/Utils';

// 기본 컴포넌트 래핑
const ContextMenu = Root;
const ContextMenuTrigger = Trigger;
const ContextMenuGroup = Group;
const ContextMenuPortal = Portal;
const ContextMenuSub = Sub;
const ContextMenuRadioGroup = RadioGroup;

function ContextMenuSubTrigger({ children, inset, className, ...props }) {
  return (
    <SubTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </SubTrigger>
  );
}

function ContextMenuSubContent({ children, className, ...props }) {
  return (
    <SubContent
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </SubContent>
  );
}

function ContextMenuContent({ children, className, ...props }) {
  return (
    <Portal>
      <Content
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          className
        )}
        {...props}
      >
        {children}
      </Content>
    </Portal>
  );
}

function ContextMenuItem({ children, inset, className, ...props }) {
  return (
    <Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
    </Item>
  );
}

function ContextMenuCheckboxItem({ children, checked, className, ...props }) {
  return (
    <CheckboxItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="h-4 w-4" />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  );
}

function ContextMenuRadioItem({ children, className, ...props }) {
  return (
    <RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  );
}

function ContextMenuLabel({ className, inset, ...props }) {
  return (
    <Label
      className={cn(
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({ className, ...props }) {
  return (
    <Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }) {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuRadioGroup,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
};
