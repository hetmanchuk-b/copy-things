"use client";

import {useState} from "react";
import {ThingWithCreator} from "@/types/main";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Icons} from '@/components/icons';
import {cn, formatDateToLocal, getRelativeTime} from "@/lib/utils";
import {ActionTooltip} from "@/components/action-tooltip";
import {useOrigin} from "@/hooks/use-origin";
import {toast} from "sonner";

interface ThingCardProps {
  thing: ThingWithCreator;
}

export const ThingCard = ({thing}: ThingCardProps) => {
  const isUpdated = thing.createdAt.getTime() !== thing.updatedAt.getTime();
  const origin = useOrigin();
  const [linkCopied, setLinkCopied] = useState(false);
  const [contentCopied, setContentCopied] = useState(false);

  const thingLink = `${origin}/thing/${thing.id}`;

  const onCopyLink = () => {
    navigator.clipboard.writeText(thingLink);
    setLinkCopied(true);

    toast.success('Link to this content has been copied!');
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  }

  const onCopyContent = () => {
    navigator.clipboard.writeText(thing.content);
    setContentCopied(true);

    toast.success('Content has been copied!');
    setTimeout(() => {
      setContentCopied(false);
    }, 2000);
  }

  return (
    <Card className="w-full max-w-2xl overflow-hidden border-0">
      <CardHeader>
        <CardTitle>
          {thing.creator.username} shared this content
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Content created:{' '}
          <ActionTooltip label={formatDateToLocal(thing.createdAt.getTime(), 'en-US', 'full')}>
            <span>{getRelativeTime(thing.createdAt.getTime())}</span>
          </ActionTooltip>
          {isUpdated && (
            <>
              <br/>
              Updated:{' '}
              <ActionTooltip label={formatDateToLocal(thing.updatedAt.getTime(), 'en-US', 'full')}>
                <span>{getRelativeTime(thing.updatedAt.getTime())}</span>
              </ActionTooltip>
            </>
          )}
        </div>
        <CardDescription>
          {thing.content.length} characters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          {thing.title && <p className="text-xl font-bold">{thing.title}</p>}
          <div className="border-2 border-zinc-500 border-dashed rounded-md shadow p-2 whitespace-pre">
            {thing.content}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-x-2 p-6 bg-zinc-400">
        <Button
          variant={'outline'}
          className={cn(
            'gap-x-2',
            linkCopied && 'bg-emerald-500 hover:bg-emerald-500 border-transparent text-white hover:text-white'
          )}
          size={'lg'}
          onClick={onCopyLink}
        >
          Copy link
          {linkCopied
            ? <Icons.check className="w-5 h-5" />
            : <Icons.copy className="w-5 h-5" />}
        </Button>
        <Button
          className={cn(
            'grow gap-x-2',
            contentCopied && 'bg-emerald-500 hover:bg-emerald-500'
          )}
          size={'lg'}
          onClick={onCopyContent}
        >
          Copy text
          {contentCopied
            ? <Icons.check className="w-5 h-5" />
            : <Icons.copy className="w-5 h-5" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
