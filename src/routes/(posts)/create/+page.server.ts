import { db } from "$lib/db";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async (event) => {
    const fdata = Object.fromEntries(await event.request.formData())
    if (!fdata.title || !fdata.body) {
      return fail(400, {
				error: 'Missing title or body'
			});
    }
    const title = fdata.title as string
    const body = fdata.body as string

    const post = await db.post.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        authorId: event.locals.user?.id
      }
    })

    throw redirect(302, '/')
  }
}