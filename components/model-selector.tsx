'use client';

import { Globe } from 'lucide-react';
import { startTransition, useMemo, useState } from 'react';

import { saveModelId } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { models } from '@/lib/ai/models';
import { cn } from '@/lib/utils';

import { CheckCircleFillIcon, ChevronDownIcon } from './icons';

export function ModelSelector({
  selectedModelId,
  className,
}: {
  selectedModelId: string;
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [currentModelId, setCurrentModelId] = useState(selectedModelId);

  const selectedModel = useMemo(
    () => models.find((model) => model.id === currentModelId),
    [currentModelId],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button variant="outline" className="md:px-2 md:h-[34px] gap-2">
          {selectedModel?.iconPath && (
            <img
              src={selectedModel.iconPath}
              alt={`${selectedModel.provider} icon`}
              className="size-4"
            />
          )}
          <div className="flex items-center gap-2">
            {selectedModel?.label}
            {selectedModel?.canWebSearch && (
              <Globe className="size-4 text-muted-foreground" />
            )}
          </div>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[200px] max-h-[300px] overflow-y-auto"
      >
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onSelect={() => {
              setOpen(false);

              startTransition(() => {
                setCurrentModelId(model.id);
                saveModelId(model.id);
              });
            }}
            className="gap-4 group/item flex flex-row justify-between items-center"
            data-active={model.id === currentModelId}
          >
            <div className="flex items-center gap-3">
              <img
                src={model.iconPath}
                alt={`${model.provider} icon`}
                className="size-4"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {model.label}
                  {model.canWebSearch && (
                    <Globe className="size-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            <div className="text-primary dark:text-primary-foreground opacity-0 group-data-[active=true]/item:opacity-100">
              <CheckCircleFillIcon />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
