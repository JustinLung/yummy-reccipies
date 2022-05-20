<script>
  import '$lib/styles/style.css'
  import Navigation from '$lib/components/Navigation.svelte'
  import Header from '$lib/components/Header.svelte'
</script>

<Header />
<main>
  <slot />
</main>
<Navigation />
