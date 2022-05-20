<!-- JS -->
<script>
  import { supabase } from "$lib/supabase";
  import { fly } from "svelte/transition";

  async function getRecipes() {
    try {
      const { data, error } = await supabase
        .from("recipe")
        .select()
        .order("id", { ascending: false });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<!-- HTML -->

{#await getRecipes()}
  <p class="loading-text">Loading Content...</p>
  <div class="loader" />
{:then data}
  {#each data as data}
    <div class="recipe" in:fly={{ y: -10, duration: 500, delay: 500 }} out:fly={{ y: -10, duration: 500 }}>
      <div class="recipe-header">
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
      <a href="recipe/{data.id}">
        <img src="/assets/images/pasta.webp" alt="" class="recipe-image" />
      </a>
      <h3>{data.name}</h3>
      <p class="description"><span>Description:</span> {data.description}</p>
      <p class="time">
        <span>Preperation Time:</span>
        {data.preparation_time} Minutes
      </p>
      <p class="time"><span>Cooking Time:</span> {data.cooking_time} Minutes</p>
    </div>
    <span class="seperator"  in:fly={{ y: -10, duration: 500, delay: 500 }} out:fly={{ y: -10, duration: 500 }}/>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}

<!-- CSS -->
<style>
  h2,
  p {
    font-size: 1rem;
  }

  .recipe {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .seperator {
    margin-top: 1em;
    margin-bottom: 2em;
  }

  .profile-icon {
    width: 2.5em;
  }

  .recipe-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 1em;
    margin-bottom: 1em;
  }

  h3 {
    padding-top: 1em;
    align-self: flex-start;
  }

  .description,
  .time {
    align-self: flex-start;
  }

  span {
    font-weight: bold;
  }

  .recipe .recipe-image {
    border-radius: 0.5em;
    width: 100%;
  }
</style>
