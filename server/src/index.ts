
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  updateAboutMeInputSchema,
  createProjectInputSchema,
  updateProjectInputSchema,
  createContactMessageInputSchema
} from './schema';

// Import handlers
import { getAboutMe } from './handlers/get_about_me';
import { updateAboutMe } from './handlers/update_about_me';
import { getProjects } from './handlers/get_projects';
import { getFeaturedProjects } from './handlers/get_featured_projects';
import { createProject } from './handlers/create_project';
import { updateProject } from './handlers/update_project';
import { deleteProject } from './handlers/delete_project';
import { createContactMessage } from './handlers/create_contact_message';
import { getContactMessages } from './handlers/get_contact_messages';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // About Me routes
  getAboutMe: publicProcedure
    .query(() => getAboutMe()),
  updateAboutMe: publicProcedure
    .input(updateAboutMeInputSchema)
    .mutation(({ input }) => updateAboutMe(input)),

  // Project routes
  getProjects: publicProcedure
    .query(() => getProjects()),
  getFeaturedProjects: publicProcedure
    .query(() => getFeaturedProjects()),
  createProject: publicProcedure
    .input(createProjectInputSchema)
    .mutation(({ input }) => createProject(input)),
  updateProject: publicProcedure
    .input(updateProjectInputSchema)
    .mutation(({ input }) => updateProject(input)),
  deleteProject: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteProject(input.id)),

  // Contact routes
  createContactMessage: publicProcedure
    .input(createContactMessageInputSchema)
    .mutation(({ input }) => createContactMessage(input)),
  getContactMessages: publicProcedure
    .query(() => getContactMessages()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
