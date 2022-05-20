<!-- JS -->
<script>
  import { supabase } from '$lib/supabase.js'
  import { user } from '$lib/stores/store.js'
  import { goto } from '$app/navigation'

  user.set(supabase.auth.user())

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user)
  })
</script>

<!-- HTML -->
<nav>
  <ul>
    <li>
      <a href="/"><img src="/assets/icons/home-icon.svg" alt="Home Icon" /></a>
    </li>
    <li>
      <a href="/create"
        ><img src="/assets/icons/create-icon.svg" alt="Create Icon" /></a
      >
    </li>
    <li>
      {#if $user}
        <a href="/profile">
          <img src="/assets/icons/profile-icon.svg" alt="Profile Icon" />
        </a>
      {:else}
        <a href="/login">
          <img src="/assets/icons/profile-icon.svg" alt="Profile Icon" />
        </a>
      {/if}
    </li>
  </ul>
</nav>

<!-- CSS -->
<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.7em 0;
    padding-bottom: 2em;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(19px);
    -webkit-backdrop-filter: blur(19px);
    border-radius: 0.5em;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  ul {
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
  }

  li > a {
    position: relative;
  }

  li > a::after {
    color: var(--magnolia);
    position: absolute;
    font-size: 0.8em;
    bottom: -1em;
    left: 50%;
    transform: translate(-50%);
  }

  img {
    width: 2em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.5em;
  }

  li:first-child > a:after {
    content: 'Home';
  }
  li:nth-child(2) > a:after {
    content: 'Create';
  }
  li:nth-child(3) > a:after {
    content: 'Profile';
  }
</style>
