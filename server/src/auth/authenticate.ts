import type { FastifyReply, FastifyRequest } from 'fastify'
import { getFirebaseAuth } from './firebase.js'
import './auth.types.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authorization = request.headers.authorization
  const token = authorization?.startsWith('Bearer ') ? authorization.slice('Bearer '.length) : null

  if (!token) {
    return reply.code(401).send({ message: 'Se requiere un token de autenticación.' })
  }

  try {
    request.authUser = await getFirebaseAuth().verifyIdToken(token)
  } catch {
    return reply.code(401).send({ message: 'El token no es válido o ha expirado.' })
  }
}
