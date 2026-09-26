import type { DecodedIdToken } from 'firebase-admin/auth'
import { prisma } from '../db/prisma.js'

export function ensureUser(decodedToken: DecodedIdToken) {
  return prisma.user.upsert({
    where: { firebaseUid: decodedToken.uid },
    create: {
      firebaseUid: decodedToken.uid,
      email: decodedToken.email ?? null,
      displayName: decodedToken.name ?? null,
      photoUrl: decodedToken.picture ?? null,
    },
    update: {
      email: decodedToken.email ?? null,
      displayName: decodedToken.name ?? null,
      photoUrl: decodedToken.picture ?? null,
    },
  })
}
