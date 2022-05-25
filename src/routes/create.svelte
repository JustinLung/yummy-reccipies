<script>
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'
  import { fly } from 'svelte/transition'

  let name, ingredients, description, prep_time, cooking_time, necessities
  let file = null
  let loading = false

  async function addRecipe() {
    try {
      const { data, error } = await supabase
        .from('recipe')
        .insert([{ name, ingredients, description, necessities }])
      goto('/')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  function getFile(e) {
    file = !!e.target.files.length && e.target.files[0]
  }
</script>

<form
  on:submit|preventDefault={addRecipe}
  in:fly={{ y: -10, duration: 500, delay: 500 }}
  out:fly={{ y: -10, duration: 500 }}
>
  <legend>🍽 Create Recipe</legend>

  <div>
    <label for="recipeName">Recipe name</label>
    <input
      type="text"
      name="recipeName"
      required
      bind:value={name}
      placeholder="Pasta Pesto..."
    />
  </div>
  <div>
    <label for="description" class="font-bold pt-2">Description</label>
    <input
      type="text"
      name="description"
      required
      bind:value={description}
      placeholder="Pasta Pesto with Tomato..."
    />
  </div>
  <div>
    <label for="prepTime" class="font-bold pt-2"
      >Prepartion Time (in minutes)</label
    >
    <input
      type="number"
      name="prepTime"
      required
      bind:value={prep_time}
      placeholder="10"
    />
  </div>
  <div>
    <label for="cookTime" class="font-bold pt-2"
      >Cooking Time (in minutes)</label
    >
    <input
      type="number"
      name="cookTime"
      required
      bind:value={cooking_time}
      placeholder="30"
    />
  </div>
  <div>
    <label for="ingredients">Ingredients</label>
    <textarea
      type="text"
      name="ingredients"
      required
      bind:value={ingredients}
      placeholder="Penne 300 gram, tomato's 100 gram...."
    />
  </div>
  <div>
    <label for="necessities">Necessities</label>
    <textarea
      type="text"
      name="necessities"
      required
      bind:value={necessities}
      placeholder="Pan, Big Spoon..."
    />
  </div>
  <input
    type="submit"
    value={loading ? 'Loading' : 'Create Recipe'}
    disabled={loading}
  />
</form>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  legend {
    font-size: 1.3rem;
    font-weight: bold;
    padding-bottom: 1em;
  }

  label {
    padding-bottom: 0.5em;
  }

  input,
  textarea {
    border-radius: 0.3em;
    border: none;
    padding: 0.5em 1em;
    font-size: 1rem;
    resize: none;
    margin-bottom: 1em;
  }

  textarea {
    height: 6em;
  }

  input[type='submit'] {
    all: unset;
    background-color: var(--medium-state-purple);
    padding: 0.7em 2em;
    text-align: center;
    border-radius: 0.3em;
  }
</style>
