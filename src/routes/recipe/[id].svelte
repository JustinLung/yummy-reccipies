<script>
  import { supabase } from '$lib/supabase'
  import { page } from '$app/stores'
  const id = $page.params.id
  async function renderRecipe() {
    try {
      const { data, error } = await supabase
        .from('recipe')
        .select()
        .eq('id', id)
      return data[0]
    } catch (error) {
      console.log(error)
    }
  }
</script>

{#await renderRecipe()}
  <p class="loading-text">Loading Content...</p>
  <div class="loader" />
{:then data}
  <section>
    <img src="/assets/images/pasta.webp" alt={data.name} class="recipe-image" />
    <h2>{data.name}</h2>
    <p><span>Description:</span> {data.description}</p>
    <p><span>Recipe:</span> {data.recipe}</p>
    <p><span>Necessities:</span> {data.necessities}</p>

    <a href="/">Return Home</a>
  </section>
{/await}

<style>
  .recipe-image {
    width: 100%;
    border-radius: 0.5em;
  }

  h2 {
    padding-top: 1em;
  }

  p {
    padding-bottom: 1.5em;
  }

  span {
    font-weight: bold;
  }

  a {
    all: unset;
    background-color: var(--medium-state-purple);
    padding: 0.5em 1.5em;
    text-align: center;
    border-radius: 0.3em;
  }
</style>
