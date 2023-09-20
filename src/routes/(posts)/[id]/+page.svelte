<script lang="ts">
	import { enhance } from '$app/forms';

  export let data

  let dialog: any
</script>

<svelte:head>
    <title>{data.post?.title}</title>
</svelte:head>

<article>
  <div class="flex justify-between items-center border-b border-base-300 pb-3 mb-3">
    <div class="title font-bold">{data.post?.title}</div>
    <div class="inline-flex gap-3">
      <a href="/{data.post?.id}/update" title="Edit post" class="text-gray-500"><i class="bi bi-pencil-square"></i></a>
      <button title="Delete post" class="text-gray-500" on:click={() => dialog.show()}><i class="bi bi-trash"></i></button>
    </div>
  </div>

  <div class="content prose max-w-none mb-3">
    {data.post?.body}
  </div>
</article>

<dialog bind:this={dialog} class="modal">
    <form action="/{data.post?.id}/delete" method="post" class="modal-box" use:enhance>
        <h3 class="font-bold text-lg">Confirm</h3>
        <p class="py-4">Delete this post?</p>
        <div class="modal-action">
            <button type="submit" class="btn btn-error btn-sm">Yes</button>
            <button class="btn btn-neutral btn-sm" on:click|preventDefault={() => dialog.close()}>No</button>
        </div>
    </form>
</dialog>