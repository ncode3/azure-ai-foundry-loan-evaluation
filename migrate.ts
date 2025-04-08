import { db } from "./server/db";
import { loanApplications, users } from "./shared/schema";
import { sql } from "drizzle-orm";
import { Pool } from "@neondatabase/serverless";

// Create database tables if they don't exist
async function migrate() {
  console.log("Starting database migration...");
  
  try {
    // Create the users table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
    console.log("Users table ready");

    // Create the loan_applications table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS loan_applications (
        id SERIAL PRIMARY KEY,
        income INTEGER NOT NULL,
        credit_score INTEGER NOT NULL,
        employment_status TEXT NOT NULL,
        gender TEXT NOT NULL,
        missed_payments TEXT NOT NULL,
        loan_amount INTEGER NOT NULL,
        application_date DATE NOT NULL DEFAULT CURRENT_DATE,
        traditional_evaluation JSONB NOT NULL,
        ethical_evaluation JSONB NOT NULL
      );
    `);
    console.log("Loan applications table ready");

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

// Run the migration
migrate().then(() => process.exit(0));