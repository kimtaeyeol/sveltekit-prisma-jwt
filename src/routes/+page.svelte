<script lang="ts">
  import Navigation from '$lib/components/navigation.svelte';
  import Post from '$lib/components/posts.svelte'
	import Search from '$lib/components/search.svelte';
	import type { PageServerData } from './$types';

  export let data: PageServerData
</script>

<svelte:head>
  <title>Sveltekit test</title>
</svelte:head>

<Search />

<Post posts={data.posts} />

<Navigation href="/?" prevPage={data.prevPage} nextPage={data.nextPage} />