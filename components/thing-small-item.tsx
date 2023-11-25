"use client";

import {Thing} from '@prisma/client';
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import Link from "next/link";
import {ActionTooltip} from "@/components/action-tooltip";
import {useModal} from "@/hooks/use-modal-store";

interface ThingSmallItemProps {
  thing: Thing;
}

export const ThingSmallItem = ({thing}: ThingSmallItemProps) => {
  const {onOpen} = useModal();

  return (
    <div className="flex items-center gap-x-4 p-2 hover:bg-zinc-900/10 w-full">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={`/thing/${thing.id}`}
            className={cn(buttonVariants({variant: 'link'}), 'gap-x-2')}
          >
            <Icons.pointer className="w-4 h-4" />
            {thing.id}
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-[300px] max-h-[400px] overflow-hidden">
          <div className="border-2 border-zinc-500 border-dashed rounded-md shadow p-2">
            {thing.content}
          </div>
        </HoverCardContent>
      </HoverCard>
      {thing.title && (
        <ActionTooltip label={'Thing Title'}>
          <p className="font-bold text-sm text-zinc-700">{thing.title}</p>
        </ActionTooltip>
      )}

      <div className="ml-auto flex items-center gap-x-2">
        <ActionTooltip label={'Edit'} align={'center'} side={'left'}>
          <Button
            size={'icon'}
            variant={'outline'}
            className="border-2"
            onClick={() => onOpen('editThing', thing)}
          >
            <Icons.edit className="w-5 h-5" />
          </Button>
        </ActionTooltip>
        <ActionTooltip label={'Delete'} align={'center'} side={'left'}>
          <Button
            size={'icon'}
            variant={'outline'}
            className="border-2 border-rose-500 text-rose-500 hover:border-zinc-600"
            onClick={() => onOpen('deleteThing', thing)}
          >
            <Icons.delete className="w-5 h-5" />
          </Button>
        </ActionTooltip>
      </div>
    </div>
  )
}
