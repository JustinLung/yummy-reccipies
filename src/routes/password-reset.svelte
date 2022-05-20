<script>
  import { supabase } from "$lib/supabase.js";
  
  let email;
  
  async function forgotPassword(email) {
    console.log(email);
    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
    console.log(error && error.message);
    return { data, error };
  }
</script>
