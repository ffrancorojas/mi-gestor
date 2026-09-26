import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { apiRoutes } from './routes/api.routes.js'

const app = Fastify({ logger: true })
app.decorateRequest('authUser', null)
await app.register(cors, { origin: process.env.CLIENT_ORIGIN ?? true })
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: 'Los datos enviados no son válidos.',
      issues: error.issues,
    })
  }

  request.log.error(error)
  return reply.code(500).send({ message: 'Ha ocurrido un error interno.' })
})
app.get('/health', async () => ({ status: 'ok', service: 'mi-gestor-api' }))
await app.register(apiRoutes, { prefix: '/api' })
await app.listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })
