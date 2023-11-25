import {z} from 'zod';

export const ThingValidator = z.object({
  title: z.string().max(40),
  content: z.string().min(1, {
    message: "Content is required."
  }).max(3000, {
    message: "Content is too long."
  }),
});
