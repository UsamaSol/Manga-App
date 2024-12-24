import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dnxxncqmvfxzuoxmzukg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueHhuY3FtdmZ4enVveG16dWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODg4MDIsImV4cCI6MjA1MDU2NDgwMn0.Xfi007-F1xBXmwW_haHSx7QvteGUsel2CCkBFHjou2A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})