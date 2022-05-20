<script>
  import { supabase } from '$lib/supabase.js'
  import { fly } from 'svelte/transition'

  let loading = false
  let email, password, confirmPassword
  let message = { success: null, display: '' }

  async function handleSignUp() {
    if (password != confirmPassword) {
      message = {
        success: false,
        display: 'Password and Confirm Password fields do not match',
      }
      return
    }
    try {
      loading = true
      const { error } = await supabase.auth.signUp({ email, password })
      console.log(error)
      if (error) throw error
      message = {
        success: true,
        display:
          'We have sent you a confirmation email. Please check your inbox',
      }
    } catch (error) {
      console.log(error)
      let errorMsg = error.error_description || error.message
      message = { success: false, display: errorMsg }
    } finally {
      loading = false
    }
  }
</script>

<section
  in:fly={{ y: -10, duration: 500, delay: 500 }}
  out:fly={{ y: -10, duration: 500 }}
>
  <h2>🍕 Register</h2>
  <p>
    Already have an account yet? <a href="/login">Sign In</a>
  </p>
</section>

<div
  in:fly={{ y: -10, duration: 500, delay: 500 }}
  out:fly={{ y: -10, duration: 500 }}
>
  <form on:submit|preventDefault={handleSignUp}>
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        bind:value={email}
      />
    </div>

    <div>
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Your password"
        bind:value={password}
      />
    </div>

    <div>
      <label for="password">Confirm Password</label>
      <input
        type="password"
        name="confPassword"
        placeholder="Your password"
        bind:value={confirmPassword}
      />
    </div>

    <p class="reset">Forgot Password? / <a href="/forgot-password">Reset</a></p>

    <input
      type="submit"
      value={loading ? 'Loading' : 'Sign up'}
      disabled={loading}
    />

    {#if message.success != null}
      <p
        class="alert {message.success ? 'alert-success' : 'alert-danger'}"
        role="alert"
      >
        {message.display}
      </p>
    {/if}
  </form>
</div>

<style>
  h2,
  p {
    padding: 0;
    margin: 0;
  }

  h2 {
    padding-top: 1em;
  }

  a {
    color: var(--ash-gray);
    text-decoration: none;
    font-weight: 500;
  }

  div {
    display: flex;
    flex-direction: column;
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
    color: var(--magnolia);
    width: 100%;
  }

  .reset {
    padding: 0.5em 0 1em;
  }
</style>
