<script lang="ts">
  import Alert from '$lib/components/alert.svelte'
  import {enhance} from '$app/forms'

  export let form
</script>

<svelte:head>
    <title>Register New User</title>
</svelte:head>

{#if form?.error}
  <Alert>{form?.error}</Alert>
{/if}

<div class="w-full md:w-2/3 md:mx-auto">
  <form method="post" use:enhance>
      <div class="mb-3">
          <input type="text" name="name" placeholder="Username" class="input input-bordered w-full">
      </div>
      <div class="mb-3">
        <input type="text" name="email" placeholder="email" class="input input-bordered w-full">
      </div>
      <div class="mb-3">
          <input type="password" name="password" placeholder="Password"  class="input input-bordered w-full">
      </div>
      <div class="inline-flex items-center gap-3">
          <button type="submit" class="btn btn-primary">Register</button>
      </div>
  </form>
</div>