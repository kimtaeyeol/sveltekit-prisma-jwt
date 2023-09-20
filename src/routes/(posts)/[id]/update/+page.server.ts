import { db } from '$lib/db.js';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
  const post = await db.post.findFirst({
    where: {
      AND: [
        { author: { id: event.locals.user?.id } },
        { id: Number(event.params.id) },
      ]
    },
  });

  if (!post) {
    throw redirect(302, '/');
  }
  return {post}
}

export const actions: Actions = {
  default: async ({request, params}) => {
    const fdata = Object.fromEntries(await request.formData())
    const title = fdata.title as string
    const body = fdata.body as string
    if (title.length === 0) {
      return fail(400, {
				error: 'Missing title or body'
			});
    }

    await db.post.update({
      where: {
        id: Number(params.id)
      },
      data: {
        title: title.trim(),
        body: body.trim()
      }
    })

    throw redirect(302, '/')
  }
}