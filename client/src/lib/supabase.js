import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Function to initialize Supabase client using relative path
const initSupabase = async () => {
    try {
        const response = await axios.get('/api/config');
        const { supabaseUrl, supabaseAnonKey } = response.data;
        return createClient(supabaseUrl, supabaseAnonKey);
    } catch (error) {
        console.error('Failed to fetch config from backend:', error);
        return null;
    }
};

export const supabasePromise = initSupabase();

export let supabase = null;
supabasePromise.then(client => {
    supabase = client;
});
