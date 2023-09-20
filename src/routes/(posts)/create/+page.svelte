<script lang="ts">
  import Alert from '$lib/components/alert.svelte'
	import { enhance } from "$app/forms";

  export let form
</script>

<svelte:head>
    <title>Create</title>
</svelte:head>

{#if form?.error}
    <Alert>{@html form?.error}</Alert>
{/if}

<form method="post" use:enhance>
    <div class="mb-3">
        <input type="text" name="title" placeholder="Title" class="input input-bordered w-full">
    </div>
    <div class="mb-3">
        <textarea name="body" rows="5" placeholder="Body" class="textarea textarea-bordered w-full"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
</form>
