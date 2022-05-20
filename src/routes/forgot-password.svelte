<script>
  import { supabase } from '$lib/supabase.js'
  let loading = false
  let email
  let message = { success: null, display: '' }

  async function sendEmail() {
    try {
      loading = true
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      )
      if (error) throw error
      message = {
        success: true,
        display: 'We have sent you a recovery email. Please check your inbox',
      }
    } catch (error) {
      let errorMsg = error.error_description || error.message
      message = { success: false, display: errorMsg }
    } finally {
      loading = false
    }
  }
</script>

<form on:submit|preventDefault={sendEmail}>
  <div>
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      placeholder="Your email"
      bind:value={email}
    />
  </div>
  <input
    type="submit"
    value={loading ? 'Loading' : 'Send Email'}
    disabled={loading}
  />
</form>
