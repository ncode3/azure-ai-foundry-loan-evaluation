import { users, loanApplications, type User, type InsertUser, type LoanApplication, type InsertLoanApplication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Add loan application methods
  getLoanApplication(id: number): Promise<LoanApplication | undefined>;
  getLoanApplications(): Promise<LoanApplication[]>;
  createLoanApplication(application: InsertLoanApplication & { 
    traditionalEvaluation: any, 
    ethicalEvaluation: any 
  }): Promise<LoanApplication>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    const [application] = await db.select().from(loanApplications).where(eq(loanApplications.id, id));
    return application || undefined;
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return await db.select().from(loanApplications).orderBy(loanApplications.applicationDate);
  }

  async createLoanApplication(application: InsertLoanApplication & { 
    traditionalEvaluation: any, 
    ethicalEvaluation: any 
  }): Promise<LoanApplication> {
    const [loanApp] = await db
      .insert(loanApplications)
      .values({
        income: application.income,
        creditScore: application.creditScore,
        employmentStatus: application.employmentStatus,
        gender: application.gender,
        missedPayments: application.missedPayments,
        loanAmount: application.loanAmount,
        applicationDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
        traditionalEvaluation: application.traditionalEvaluation,
        ethicalEvaluation: application.ethicalEvaluation
      })
      .returning();
    return loanApp;
  }
}

export const storage = new DatabaseStorage();
