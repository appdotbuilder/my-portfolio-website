
import { z } from 'zod';

// About Me schema
export const aboutMeSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  location: z.string().nullable(),
  profile_image_url: z.string().url().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type AboutMe = z.infer<typeof aboutMeSchema>;

// Input schema for updating about me
export const updateAboutMeInputSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  profile_image_url: z.string().url().nullable().optional()
});

export type UpdateAboutMeInput = z.infer<typeof updateAboutMeInputSchema>;

// Project schema
export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  technologies: z.string(), // Comma-separated string of technologies
  project_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  image_url: z.string().url().nullable(),
  featured: z.boolean(),
  order_index: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Project = z.infer<typeof projectSchema>;

// Input schema for creating projects
export const createProjectInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.string(),
  project_url: z.string().url().nullable(),
  github_url: z.string().url().nullable(),
  image_url: z.string().url().nullable(),
  featured: z.boolean().default(false),
  order_index: z.number().int().default(0)
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

// Input schema for updating projects
export const updateProjectInputSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  technologies: z.string().optional(),
  project_url: z.string().url().nullable().optional(),
  github_url: z.string().url().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  featured: z.boolean().optional(),
  order_index: z.number().int().optional()
});

export type UpdateProjectInput = z.infer<typeof updateProjectInputSchema>;

// Contact message schema
export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  created_at: z.coerce.date()
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

// Input schema for creating contact messages
export const createContactMessageInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

export type CreateContactMessageInput = z.infer<typeof createContactMessageInputSchema>;
