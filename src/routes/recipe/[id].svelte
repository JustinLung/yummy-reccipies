<script>
  import { supabase } from '$lib/supabase'
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'

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
  <div
    class="recipe-header"
    in:fly={{ y: -10, duration: 500, delay: 500 }}
    out:fly={{ y: -10, duration: 500 }}
  >
    <img
      src="/assets/icons/profile-icon.svg"
      alt="profile"
      class="profile-icon"
    />
    <div class="username">
      <h2>{data.profile_name}</h2>
      <p>{data.username}</p>
    </div>
  </div>
  <section
    in:fly={{ y: -10, duration: 500, delay: 500 }}
    out:fly={{ y: -10, duration: 500 }}
  >
    <img src="/assets/images/pasta.webp" alt={data.name} class="recipe-image" />
    <h2 class="recipe-name">{data.name}</h2>
    <p><span>Description:</span> {data.description}</p>
    <p><span>Ingredients:</span> {data.ingredients}</p>
    <p><span>Necessities:</span> {data.necessities}</p>
    <p><span>Preperation Time:</span> {data.preparation_time} Minutes</p>
    <p><span>Cooking Time:</span> {data.cooking_time} Minutes</p>

    <a href="/">Return Home</a>
  </section>
{/await}

<style>
  .recipe-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 1em;
    margin-bottom: 1em;
  }

  .profile-icon {
    width: 2.5em;
  }

  .recipe-image {
    width: 100%;
    border-radius: 0.5em;
  }

  .recipe-name {
    padding-top: 1em;
  }

  p:nth-child(5) {
    padding-bottom: 1.5em;
  }

  p:nth-child(7) {
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
