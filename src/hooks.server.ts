import jwt from 'jsonwebtoken'
import {JWT_ACCESS_SECRET} from '$env/static/private'
import { db } from '$lib/db'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle= async ({event, resolve}) => {
  const authCookie = event.cookies.get('AuthorizationToken')
  if (authCookie) {
    const token = authCookie.split(' ')[1]
    try {
      const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET)
      if (typeof jwtUser === 'string') {
        throw new Error('Something went wrong');
      }
      const user = await db.user.findUnique({
        where: {id: jwtUser.id}
      })
      if (!user) {
        throw new Error('User not found');
      }
      const sessionUser = {
        id: user.id,
        email: user.email
      }
      event.locals.user = sessionUser
    } catch (error) {
      console.error(error)
    }
  }
  return await resolve(event);
}
