import 'dotenv/config';
import { execSync } from 'child_process';
const { SUPABASE_PROJECT_ID, SUPABASE_ACCESS_TOKEN } = process.env;

execSync(
  `SUPABASE_ACCESS_TOKEN=${SUPABASE_ACCESS_TOKEN} supabase gen types typescript --project-id ${SUPABASE_PROJECT_ID} > app/types/database.types.ts`
);
