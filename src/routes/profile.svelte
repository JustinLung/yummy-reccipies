<script>
  import { supabase } from '$lib/supabase.js'
  import { fly } from 'svelte/transition'

  let loading = false
  let username = null
  let website = null
  let profile_name = null
  let avatar_url = null

  async function getProfile() {
    try {
      loading = true
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, profile_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        username = data.username
        website = data.website
        avatar_url = data.avatar_url
        profile_name = data.profile_name
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      loading = false
    }
  }

  async function updateProfile() {
    try {
      loading = true
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        profile_name,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      })

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading = false
    }
  }
</script>

<h2
  in:fly={{ y: -10, duration: 500, delay: 500 }}
  out:fly={{ y: -10, duration: 500 }}
>
  👤 Edit Profile
</h2>

<img
  src={avatar_url}
  alt={username}
  in:fly={{ y: -10, duration: 500, delay: 500 }}
  out:fly={{ y: -10, duration: 500 }}
/>

<form
  use:getProfile
  on:submit|preventDefault={updateProfile}
  in:fly={{ y: -10, duration: 500, delay: 500 }}
  out:fly={{ y: -10, duration: 500 }}
>
  <div>
    <label for="profile_name">Name</label>
    <input id="profile_name" type="text" bind:value={profile_name} />
  </div>
  <div>
    <label for="username">Username</label>
    <input id="username" type="text" bind:value={username} />
  </div>
  <div>
    <label for="website">Website</label>
    <input id="website" type="website" bind:value={website} />
  </div>

  <div>
    <input
      type="submit"
      class="cta"
      value={loading ? 'Loading ...' : 'Update Profile'}
      disabled={loading}
    />
  </div>
</form>

<style>
  h2 {
    font-size: 1.3rem;
    padding-bottom: 0.5em;
  }
  div {
    display: flex;
    flex-direction: column;
  }

  img {
    border-radius: 0.5em;
    margin-bottom: 1em;
    width: 100%;
  }

  input:nth-child(2) {
    margin-bottom: 1em;
  }

  label {
    padding-bottom: 0.5em;
  }

  input {
    border-radius: 0.3em;
    border: none;
    padding: 0.5em 1em;
    font-size: 1rem;
  }

  input[type='submit'] {
    all: unset;
    background-color: var(--medium-state-purple);
    padding: 0.7em 2em;
    text-align: center;
    border-radius: 0.3em;
  }
</style>
