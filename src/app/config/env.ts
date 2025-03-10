import { config } from 'dotenv';
import path from 'path';

// Load environment variables from the config directory
config({
  path: path.resolve(process.cwd(), 'src/app/config/.env'),
});

export const env = {
  // Add other environment variables here as needed
} as const; 