import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/db";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    throw redirect(302, '/signin')
  }

  const post = await db.post.findFirst({
    where: {
        AND: [
            { author: { id: event.locals.user.id } },
            { id: Number(event.params.id) },
        ]
    },
  })
  if (!post) {
    throw redirect(302, '/');
  }

  return {post}
}