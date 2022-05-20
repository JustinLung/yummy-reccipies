<script>
  import { supabase } from '$lib/supabase.js'
  import { user } from '$lib/stores/store.js'
  import { goto } from '$app/navigation'

  user.set(supabase.auth.user())
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user)
  })

  function logout() {
    supabase.auth.signOut()
    goto('/login')
  }
</script>

<header>
  <h1>🧁 Yummy Recipes</h1>
  {#if $user}
    <button class="cta" on:click={logout}>Logout</button>
  {:else}
    <button class="cta display-none" on:click={logout}>Logout</button>
  {/if}
</header>

<style>
  header {
    padding: 1em 1.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  h1 {
    font-size: 1.5rem;
  }

  .display-none {
    display: none !important;
  }

  .cta {
    all: unset;
    background-color: var(--medium-state-purple);
    padding: 0.5em 1em;
    border-radius: 0.3em;
    font-size: 1rem;

    margin-left: auto;
  }
</style>
