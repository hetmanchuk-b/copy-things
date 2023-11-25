"use client"

import {User} from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {UserAvatar} from "@/components/user-avatar";
import {signOut} from "next-auth/react";
import {Icons} from '@/components/icons';
import Link from "next/link";
import {ActionTooltip} from "@/components/action-tooltip";
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal-store";

interface UserAccountNavProps {
  user: User;
}

export const UserAccountNav = ({user}: UserAccountNavProps) => {
  const {onOpen} = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 self-stretch">
        <div className="flex items-center justify-center gap-x-2 py-2 px-4 bg-zinc-900/10 hover:bg-zinc-900/20 rounded-md">
          <div className="text-zinc-50 font-semibold">
            {user.username}
          </div>
          <UserAvatar
            className="w-8 h-8"
            user={user}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className="bg-muted-foreground text-zinc-50">
        <div className="flex flex-col space-y-1 leading-none pl-2 pb-1">
          {user.username && (
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium w-[160px] truncate" title={user.username}>
                {user.username}
              </p>
              <ActionTooltip label={'Edit username'} side={'left'} align={'center'}>
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  className="w-8 h-8"
                  onClick={() => onOpen('editUsername', {username: user.username ?? undefined})}
                >
                  <span className="sr-only">Edit user name</span>
                  <Icons.edit className="w-4 h-4" />
                </Button>
              </ActionTooltip>
            </div>
          )}
          {user.email && (
            <p
              className="text-zinc-200 text-sm w-[200px] truncate font-normal"
              title={user.email || ''}
            >
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href='/new-thing' className="flex items-center justify-between gap-2">
            Create new thing
            <Icons.addCircle className="w-4 h-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
        >
          <Link href='/user-things' className="flex items-center justify-between gap-2">
            Your things
            <Icons.files className="w-4 h-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer text-rose-200"
          onSelect={async (event) => {
            event.preventDefault();
            await signOut({
              callbackUrl: `${window.location.origin}/sign-in`
            })
          }}
        >
          <p className="flex items-center justify-between gap-2 font-semibold">
            Sign Out
            <Icons.logout className="w-4 h-4" />
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
