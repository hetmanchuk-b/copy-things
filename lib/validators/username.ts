import {z} from 'zod';

export const UsernameValidator = z.object({
  name: z.string().min(3).max(28).regex(/^[a-zA-Z0-9_іІїЇґҐєЄа-яА-Я]+$/)
});
