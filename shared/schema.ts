import { pgTable, text, serial, integer, boolean, date, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Loan application schema
export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  income: integer("income").notNull(),
  creditScore: integer("credit_score").notNull(),
  employmentStatus: text("employment_status").notNull(),
  gender: text("gender").notNull(),
  missedPayments: text("missed_payments").notNull(),
  loanAmount: integer("loan_amount").notNull(),
  applicationDate: date("application_date").notNull().defaultNow(),
  traditionalEvaluation: json("traditional_evaluation").notNull(),
  ethicalEvaluation: json("ethical_evaluation").notNull(),
});

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
  applicationDate: true,
  traditionalEvaluation: true,
  ethicalEvaluation: true,
});

export const evaluationResultSchema = z.object({
  approved: z.boolean(),
  reason: z.string(),
  analysis: z.array(z.object({
    factor: z.string(),
    value: z.string(),
    assessment: z.string(),
  })),
});

export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;
export type LoanApplication = typeof loanApplications.$inferSelect;
export type EvaluationResult = z.infer<typeof evaluationResultSchema>;
