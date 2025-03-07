import { createClient } from '@supabase/supabase-js';
import { env } from '@/app/config/env';

export const supabase = createClient(
  env.supabase.url as string,
  env.supabase.anonKey as string,
  {
    auth: {
      persistSession: true,
    },
  }
);

// Helper function to get service role client (for admin operations)
export const getServiceSupabase = () => {
  return createClient(
    env.supabase.url as string,
    env.supabase.serviceRoleKey as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}; 