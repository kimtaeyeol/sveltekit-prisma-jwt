import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({cookies}) => {
    cookies.set('AuthorizationToken', '', {
      path: '/',
      expires: new Date(0)
    })

    throw redirect(302, '/')
  }
}