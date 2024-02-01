import { z } from 'zod';

export type OptionalObject<T> = {
  [P in keyof T]?: T[P];
};

export const UserFormSchema = z.object({
  name: z.string().min(8, 'Must have a name with at least 8 characters'),
  email: z.string().email('Must be a valid email'),
  cellphone: z.string().regex(/^\d{10}$/, 'Must be a 10 digit number'),
});

export type UserForm = z.infer<typeof UserFormSchema>;

export const UserFormDefault: UserForm = {
  name: '',
  email: '',
  cellphone: '',
};

export const ListedDataSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Must have a title with at least 3 characters'),
  subtitle: z.string().min(3, 'Must have a subtitle with at least 3 characters').optional(),
  description: z.string().min(3, 'Must have a description with at least 3 characters'),
});

export type ListedData = z.infer<typeof ListedDataSchema>;

export const UserDetailsFormSchema = z.object({
  yearsOfExperience: z.string().regex(/^\d+$/, 'Must be a number').transform(Number),
  experience: z.array(ListedDataSchema),
  skills: z.array(z.string().transform(v => v.trim()).pipe(z.string().min(1, 'Skill must have at least one character'))).min(1, 'Must have at least one skill'),
  education: z.array(ListedDataSchema),
  projects: z.array(ListedDataSchema),
});

export type UserDetailsForm = z.infer<typeof UserDetailsFormSchema>;

export const UserDetailsFormDefault: UserDetailsForm = {
  yearsOfExperience: 0,
  experience: [],
  skills: [],
  education: [],
  projects: [],
};

export type User = UserForm & UserDetailsForm;