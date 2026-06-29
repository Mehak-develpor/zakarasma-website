import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ellsuyfdxwsoxrceeaan.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbHN1eWZkeHdzb3hyY2VlYWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTY4NTEsImV4cCI6MjA5Nzg3Mjg1MX0.TpU2tr57xopEbma19lZPRL1W23lgkKSX3xUZE-_V-bw';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using demo mode.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
