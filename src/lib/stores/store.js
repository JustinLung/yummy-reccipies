import { writable } from 'svelte/store'
import { supabase } from '$lib/supabase.js'

export const user = writable(false)
