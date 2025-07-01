
import { serial, text, pgTable, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const aboutMeTable = pgTable('about_me', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: text('bio').notNull(),
  email: text('email').notNull(),
  phone: text('phone'), // Nullable by default
  location: text('location'), // Nullable by default
  profile_image_url: text('profile_image_url'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  technologies: text('technologies').notNull(), // Comma-separated string
  project_url: text('project_url'), // Nullable by default
  github_url: text('github_url'), // Nullable by default
  image_url: text('image_url'), // Nullable by default
  featured: boolean('featured').default(false).notNull(),
  order_index: integer('order_index').default(0).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

export const contactMessagesTable = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// TypeScript types for the table schemas
export type AboutMe = typeof aboutMeTable.$inferSelect;
export type NewAboutMe = typeof aboutMeTable.$inferInsert;

export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;

export type ContactMessage = typeof contactMessagesTable.$inferSelect;
export type NewContactMessage = typeof contactMessagesTable.$inferInsert;

// Important: Export all tables for proper query building
export const tables = {
  aboutMe: aboutMeTable,
  projects: projectsTable,
  contactMessages: contactMessagesTable
};
