import {Thing} from '@prisma/client';
import {User} from "next-auth";

export type ThingWithCreator = Thing & {
  creator: User;
}
