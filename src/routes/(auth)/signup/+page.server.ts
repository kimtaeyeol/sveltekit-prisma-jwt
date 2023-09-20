import { db } from "$lib/db";
import bcrypt from 'bcryptjs'
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({request}) => {
    const {name, email, password} = Object.fromEntries(await request.formData()) as Record<string, string>
    if (!name || !email || !password) {
      return fail(400, {
				error: 'Missing username or email or password'
			});
    }

    const user = await db.user.findUnique({
      where: {email}
    })

    if (user) {
      return fail(400, {
        error: 'User already exists'
      })
    }

    await db.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: await bcrypt.hash(password, 10)
      }
    })

    throw redirect(303, '/signin')
  }
}