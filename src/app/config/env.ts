import { config } from 'dotenv';
import path from 'path';

// Load environment variables from the config directory
config({
  path: path.resolve(process.cwd(), 'src/app/config/supabase.env'),
});

export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    databaseUrl: process.env.DATABASE_URL,
  },
} as const;

// Type guard to ensure all environment variables are defined
Object.entries(env.supabase).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}); 