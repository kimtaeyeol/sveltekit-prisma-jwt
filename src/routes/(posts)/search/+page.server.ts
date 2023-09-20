import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/db";

export const load: PageServerLoad = async ({locals, url}) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  const q = String(url.searchParams.get('q')).trim();
  const page = Number(url.searchParams.get('page') ?? '1');

  const posts = await db.post.findMany({
    where: {
      OR: [
        { title: { contains: q }},
        { body: { contains: q }}
      ],
      AND: [
        { authorId: locals.user.id },
      ]
    },
    take: 10,
    skip: page == 1 ? 0 : (page - 1) * 10,
    orderBy: [{ id: 'desc'}]
  })

  const prevPage = page == 1 ? 0 : page - 1;
  const nextPage = posts.length < 10 ? 0 : page + 1;

  return { q, posts, prevPage, nextPage };
}