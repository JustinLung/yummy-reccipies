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
    <h2>{data.name}</h2>
    <p class="description">{data.description}</p>
    <p class="recipe">{data.recipe}</p>

    <a href="/">Return Home</a>
  </section>
{/await}

<style>
  .description {
    font-weight: bold;
    padding-bottom: 1em;
  }

  .recipe {
    padding-bottom: 1.5em;
  }

  a {
    all: unset;
    background-color: var(--medium-state-purple);
    padding: 0.5em 1.5em;
    text-align: center;
    border-radius: 0.3em;
  }
</style>
