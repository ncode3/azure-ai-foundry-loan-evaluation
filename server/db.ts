import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { users, loanApplications } from "../shared/schema";

// Create a pool for database connections
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a drizzle instance
export const db = drizzle(pool, { schema: { users, loanApplications } });