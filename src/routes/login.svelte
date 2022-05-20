<script>
  import { supabase } from '$lib/supabase.js'
  import { goto } from '$app/navigation'

  let loading = false
  let email, password
  let message = { success: null, display: '' }
  const user = supabase.auth.user()
  export const session = supabase.auth.session()

  async function handleLogin() {
    try {
      loading = true
      const { error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      message = { success: true, display: 'Successfully logged in!' }
      console.log(user)
      goto('/')
    } catch (error) {
      let errorMsg = error.error_description || error.message
      message = { success: false, display: errorMsg }
    } finally {
      loading = false
    }
  }
</script>

<section>
  <h2>👋 Hey, Login Now.</h2>
  <p>
    Don't have an account yet? <a href="/register" class="text-blue-900"
      >Sign Up</a
    >
  </p>
</section>

<form on:submit|preventDefault={handleLogin}>
  <div>
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      placeholder="Your Email"
      bind:value={email}
    />
  </div>

  <div>
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      placeholder="Your Password"
      bind:value={password}
    />
  </div>

  <p class="reset">Forgot Password? / <a href="/password-reset">Reset</a></p>

  <input
    type="submit"
    value={loading ? 'Loading' : 'Login'}
    disabled={loading}
    class="cta"
  />
  {#if message.success != null}
    <div
      class="alert {message.success ? 'alert-success' : 'alert-danger'}"
      role="alert"
    >
      {message.display}
    </div>
  {/if}
</form>

<style>
  h2,
  p {
    padding: 0;
    margin: 0;
  }

  a {
    color: var(--ash-gray);
    text-decoration: none;
    font-weight: 500;
  }

  section {
    padding: 1.5em;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  form {
    padding: 0 1.5em;
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

  input[type='email'],
  input[type='password'] {
    height: 1.8em;
  }

  input[type='submit'] {
    background-color: var(--medium-state-purple);
    padding: 0.7em 5em;
  }

  .reset {
    padding: 0.5em 0 1em;
  }
</style>
