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

// Memory storage for when database connection fails
export class MemStorage implements IStorage {
  private users: User[] = [];
  private loanApplications: LoanApplication[] = [];
  private nextUserId = 1;
  private nextLoanAppId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser: User = {
      ...insertUser,
      id: this.nextUserId++,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    return this.loanApplications.find(app => app.id === id);
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return [...this.loanApplications].sort((a, b) => {
      return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
    });
  }

  async createLoanApplication(application: InsertLoanApplication & { 
    traditionalEvaluation: any, 
    ethicalEvaluation: any 
  }): Promise<LoanApplication> {
    const newApp: LoanApplication = {
      id: this.nextLoanAppId++,
      income: application.income,
      creditScore: application.creditScore,
      employmentStatus: application.employmentStatus,
      gender: application.gender,
      missedPayments: application.missedPayments,
      loanAmount: application.loanAmount,
      applicationDate: new Date().toISOString().split('T')[0],
      traditionalEvaluation: application.traditionalEvaluation,
      ethicalEvaluation: application.ethicalEvaluation
    };
    this.loanApplications.push(newApp);
    return newApp;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    } catch (err) {
      console.error("Database error in getUser:", err);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    } catch (err) {
      console.error("Database error in getUserByUsername:", err);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values(insertUser)
        .returning();
      return user;
    } catch (err) {
      console.error("Database error in createUser:", err);
      throw err;
    }
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    try {
      const [application] = await db.select().from(loanApplications).where(eq(loanApplications.id, id));
      return application || undefined;
    } catch (err) {
      console.error("Database error in getLoanApplication:", err);
      return undefined;
    }
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    try {
      return await db.select().from(loanApplications).orderBy(loanApplications.applicationDate);
    } catch (err) {
      console.error("Database error in getLoanApplications:", err);
      return [];
    }
  }

  async createLoanApplication(application: InsertLoanApplication & { 
    traditionalEvaluation: any, 
    ethicalEvaluation: any 
  }): Promise<LoanApplication> {
    try {
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
    } catch (err) {
      console.error("Database error in createLoanApplication:", err);
      throw err;
    }
  }
}

// Create a fallback storage system
class FallbackStorage implements IStorage {
  private dbStorage: DatabaseStorage;
  private memStorage: MemStorage;
  private useMemory = false;

  constructor() {
    this.dbStorage = new DatabaseStorage();
    this.memStorage = new MemStorage();
  }

  private async withFallback<T>(dbOperation: () => Promise<T>, memOperation: () => Promise<T>): Promise<T> {
    if (this.useMemory) {
      return await memOperation();
    }

    try {
      return await dbOperation();
    } catch (error) {
      console.log("Database operation failed, falling back to in-memory storage:", error);
      this.useMemory = true; // Once we fail, use memory for all subsequent operations
      return await memOperation();
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.withFallback(
      () => this.dbStorage.getUser(id),
      () => this.memStorage.getUser(id)
    );
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.withFallback(
      () => this.dbStorage.getUserByUsername(username),
      () => this.memStorage.getUserByUsername(username)
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    return this.withFallback(
      () => this.dbStorage.createUser(user),
      () => this.memStorage.createUser(user)
    );
  }

  async getLoanApplication(id: number): Promise<LoanApplication | undefined> {
    return this.withFallback(
      () => this.dbStorage.getLoanApplication(id),
      () => this.memStorage.getLoanApplication(id)
    );
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return this.withFallback(
      () => this.dbStorage.getLoanApplications(),
      () => this.memStorage.getLoanApplications()
    );
  }

  async createLoanApplication(application: InsertLoanApplication & { 
    traditionalEvaluation: any; 
    ethicalEvaluation: any; 
  }): Promise<LoanApplication> {
    return this.withFallback(
      () => this.dbStorage.createLoanApplication(application),
      () => this.memStorage.createLoanApplication(application)
    );
  }
}

export const storage = new FallbackStorage();
