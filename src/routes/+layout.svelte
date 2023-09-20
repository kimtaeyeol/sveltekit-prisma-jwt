<script>
	import { page } from '$app/stores';

  import '../app.css'
</script>

<div class="container mx-auto">
  <div class="flex justify-between items-center border-b border-primary pb-2 mb-8">
    <h1 class="font-bold uppercase"><a href="/">Home</a></h1>

    <div class="inline-flex items-center gap-3">
      {#if $page.data.user}
        <a href="/create" title="Create"><i class="bi bi-plus-circle"></i></a>
      {/if}

      {#if !$page.data.user}
        <a href="/signin" title="Sign In"><i class="bi bi-box-arrow-in-right"></i></a>
      {:else}
        <form method="POST" action="/logout">
          <button type="submit" title="Logout"><i class="bi bi-box-arrow-right"></i></button>
        </form>
      {/if}
    </div>
  </div>

  <slot />
</div>

