<script>
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation";

  let name, ingridients, description, prep_time, cooking_time, necessities;
  let loading = false;

  async function addRecipe() {
    try {
      const { data, error } = await supabase
        .from("recipe")
        .insert([{ name, recipe, description, necessities }]);
      goto("/");
      console.log(error);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<form on:submit|preventDefault={addRecipe}>
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
      name="description"
      required
      bind:value={prep_time}
      placeholder="30"
    />
  </div>
  <div>
    <label for="recipeName">Ingridients</label>
    <textarea
      type="text"
      name="recipeName"
      required
      bind:value={ingridients}
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
    value={loading ? "Loading" : "Create Recipe"}
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

  input[type="submit"] {
    all: unset;
    background-color: var(--medium-state-purple);
    padding: 0.7em 2em;
    text-align: center;
    border-radius: 0.3em;
  }
</style>
