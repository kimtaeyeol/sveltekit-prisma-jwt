<script lang="ts">
	import { enhance } from "$app/forms";
  import Alert from "$lib/components/alert.svelte"

  export let data
  export let form
</script>

<svelte:head>
    <title>Edit Note</title>
</svelte:head>

{#if form?.error}
    <Alert>{form?.error}</Alert>
{/if}

<form method="post" use:enhance>
    <input type="hidden" name="id" value="{data.post?.id}">
    <div class="mb-3">
        <input type="text" name="title" placeholder="Title" value="{data.post?.title}" class="input input-bordered w-full">
    </div>
    <div class="mb-3">
        <textarea name="body" rows="10" placeholder="Body" class="textarea textarea-bordered w-full">{data.post?.body}</textarea>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
</form>