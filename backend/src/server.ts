import Fastify, { type FastifyError } from 'fastify';
import { getRepo, GithubError } from './github.js';
import rateLimit from '@fastify/rate-limit';
import { sendAutoReply } from './mailer.js';

const app = Fastify({ logger: true });

await app.register(rateLimit, { global: false });

app.get<{ Params: { owner: string; repo: string } }>('/api/projects/:owner/:repo', async (request) => {
  return getRepo(request.params.owner, request.params.repo);
});

interface ContactBody {
  name: string;
  email: string;
  developer: string;
  summary: string;
}

app.post<{ Body: ContactBody }>(
  '/api/contact',
  {
    config: {
      rateLimit: { max: 3, timeWindow: '1 hour' },
    },
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'developer', 'summary'],
        additionalProperties: false,
        properties: {
          name: { type: 'string', minLength: 1, maxLength: 80 },
          email: { type: 'string', format: 'email', maxLength: 254 },
          developer: { type: 'string', enum: ['mizaru', 'kikazaru', 'iwazaru'] },
          summary: { type: 'string', minLength: 1, maxLength: 2000 },
        },
      },
    },
  },
    async (request) => {
            request.log.info({ contact: request.body }, 'New contact request');
            await sendAutoReply(request.body.email, request.body.name);
        return { ok: true };
  },
);

app.setErrorHandler<FastifyError>((error, request, reply) => {
  if (error instanceof GithubError) {
    request.log.warn(error.message);

    if (error.status === 404) {
      return reply.status(404).send({ error: 'Repository not found' });
    }
    if (error.status === 403 || error.status === 429) {
      return reply.status(503).send({ error: 'GitHub rate limit exceeded, try again later' });
    }
    return reply.status(502).send({ error: 'GitHub is unavailable' });
  }

  if (error.statusCode && error.statusCode < 500) {
    return reply.status(error.statusCode).send({ error: error.message });
  }

  request.log.error(error);
  return reply.status(500).send({ error: 'Internal server error' });
});

await app.listen({ port: 3000 });