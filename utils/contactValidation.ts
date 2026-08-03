import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' })
    .regex(/^[a-zA-A\s]+$/, { message: 'Name can only contain letters and spaces.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(100, { message: 'Subject cannot exceed 100 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(1000, { message: 'Message is too long (max 1000 characters).' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;


export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Category name must be at least 2 characters.' })
    .max(50, { message: 'Category name cannot exceed 50 characters.' })
    .regex(/^[^0-9]+$/, { message: 'Category name cannot contain numbers.' }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;



export const propertySchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .nonempty('Title is required'),
  image: z
    .string()
    .url('Please enter a valid Image URL')
    .optional().or(z.literal('')),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters long')
    .nonempty('Location is required'),
  price: z
    .number('Price must be a number' )
    .positive('Price must be greater than 0'),
  categoryId: z
    .string()
    .nonempty('Please select a category'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .nonempty('Description is required'),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const propertySchemaUpadte = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .nonempty('Title is required'),
  image: z
    .string()
    .url('Please enter a valid Image URL')
    .optional().or(z.literal('')),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters long')
    .nonempty('Location is required'),
  price: z
    .number('Price must be a number' )
    .positive('Price must be greater than 0'),
  categoryId: z
    .string()
    .nonempty('Please select a category'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .nonempty('Description is required'),
  isAvailable: z.boolean(),
});

export type PropertyFormDataUpdate = z.infer<typeof propertySchemaUpadte>;



export const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .nonempty('Full name is required'),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(?:\+88|88)?01[3-9]\d{8}$/.test(val),
      'Please enter a valid Bangladeshi phone number'
    ),
  profileImage: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      'Please enter a valid image URL'
    ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;