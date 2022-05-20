<script>
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'

  let name, recipe, description, necessities
  let loading = false

  async function addRecipe() {
    try {
      const { data, error } = await supabase
        .from('recipe')
        .insert([{ name, recipe, description, necessities }])
      goto('/')
      console.log(error)
      return data
    } catch (error) {
      console.log(error)
    }
  }
</script>

<section>
  <h2>Create A Recipe</h2>
  <form on:submit|preventDefault={addRecipe}>
    <label for="recipeName">Recipe name</label>
    <input type="text" name="recipeName" required bind:value={name} />

    <label for="description" class="font-bold pt-2">Description</label>
    <input type="text" name="description" required bind:value={description} />

    <label for="recipeName">Recipe</label>
    <textarea type="text" name="recipeName" required bind:value={recipe} />

    <label for="necessities">Necessities</label>
    <textarea type="text" name="necessities" required bind:value={necessities} />

    <input
      type="submit"
      value={loading ? 'Loading' : 'Create Recipe'}
      disabled={loading}
    />
  </form>
</section>
