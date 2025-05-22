import React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { Dialog, DialogContent } from '../src/components/modules/dialog';
import { cn } from '../lib/Utils';

// 기본 Command 래퍼
function Command({ className, ...props }) {
  return (
    <CommandPrimitive
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      {...props}
    />
  );
}

// Dialog에 감싼 Command 팝업
function CommandDialog({ children, ...props }) {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

// 검색 인풋
function CommandInput({ className, ...props }) {
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

// 리스트
function CommandList({ className, ...props }) {
  return (
    <CommandPrimitive.List
      className={cn(
        'max-h-[300px] overflow-y-auto overflow-x-hidden',
        className
      )}
      {...props}
    />
  );
}

// 내용 없을 때
function CommandEmpty({ className, ...props }) {
  return (
    <CommandPrimitive.Empty
      className={cn('py-6 text-center text-sm', className)}
      {...props}
    />
  );
}

// 그룹
function CommandGroup({ className, ...props }) {
  return (
    <CommandPrimitive.Group
      className={cn(
        'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

// 항목 구분선
function CommandSeparator({ className, ...props }) {
  return (
    <CommandPrimitive.Separator
      className={cn('-mx-1 h-px bg-border', className)}
      {...props}
    />
  );
}

// 항목
function CommandItem({ className, ...props }) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

// 단축키 표시
function CommandShortcut({ className, ...props }) {
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
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
