<script lang="ts">
  import Search from '$lib/components/search.svelte'
  import Posts from '$lib/components/posts.svelte'
  import Navigation from '$lib/components/navigation.svelte';

  export let data
</script>

<svelte:head>
    <title>{data.q}</title>
</svelte:head>

<Search q={data.q} />

<Posts posts={data.posts} />

<Navigation href="/search?q={data.q}&" prevPage={data.prevPage} nextPage={data.nextPage} />