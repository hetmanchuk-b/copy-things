import {User} from "next-auth";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from "next/image";
import {Icons} from '@/components/icons';
import {AvatarProps} from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'username' | 'image'>
}

export const UserAvatar = ({user, ...props}: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            width={50}
            height={50}
            src={user.image}
            alt={user.username || ''}
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.username}</span>
          <Icons.user className="w-6 h-6" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
