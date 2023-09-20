import { db } from "$lib/db";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { JWT_ACCESS_SECRET } from "$env/static/private";


export const actions: Actions = {
  default: async ({cookies, request}) => {
    const {email, password} = Object.fromEntries(await request.formData()) as Record<string, string>
    if (!email || !password) {
      return fail(400, {
				error: 'Missing email or password'
			});
    }

    const user = await db.user.findUnique({
      where: {email}
    })

    if (!user) {
      return fail(400, {
        error: 'Username not exists'
      })
    } else {
      const validPassword = await bcrypt.compare( password, user.password)
      if (!validPassword) {
        return fail(400, {
          error: 'You have entered invalid credentials.'
        });
      }
    }

    const jwtUser = {
      id: user.id,
      email: user.email
    }
    const token = jwt.sign(jwtUser, JWT_ACCESS_SECRET, {expiresIn: '1d'})
    cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		})

    throw redirect(302, '/')
  }
}
