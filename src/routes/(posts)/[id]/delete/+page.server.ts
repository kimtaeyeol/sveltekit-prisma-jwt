import { db } from "$lib/db";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({params}) => {
    await db.post.delete({
      where: {
        id: Number(params.id)
      }
    });

    throw redirect(302, '/');
  }
}