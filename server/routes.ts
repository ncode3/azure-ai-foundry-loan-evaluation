import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  generateEthicalEvaluation, 
  generateTraditionalEvaluation, 
  type LoanApplicantData
} from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for loan evaluation
  app.post("/api/evaluate-loan", async (req, res) => {
    try {
      const { 
        income, 
        creditScore, 
        employmentStatus, 
        gender, 
        missedPayments, 
        loanAmount 
      } = req.body;
      
      // Validate inputs
      if (!income || !creditScore || !employmentStatus || !gender || !missedPayments || !loanAmount) {
        return res.status(400).json({ message: "Missing required loan application data" });
      }
      
      const applicantData: LoanApplicantData = {
        income: Number(income),
        creditScore: Number(creditScore),
        employmentStatus,
        gender,
        missedPayments,
        loanAmount: Number(loanAmount)
      };
      
      // Generate traditional evaluation with potential bias
      const traditionalEvaluation = generateTraditionalEvaluation(applicantData);
      
      // Generate ethical evaluation using Azure AI
      const ethicalEvaluation = await generateEthicalEvaluation(applicantData);
      
      // Store the application and evaluation results in the database
      await storage.createLoanApplication({
        ...applicantData,
        traditionalEvaluation,
        ethicalEvaluation
      });
      
      // Return the evaluation results
      res.json({
        traditionalEvaluation,
        ethicalEvaluation,
        differences: generateDifferences(traditionalEvaluation.approved, ethicalEvaluation.approved, gender)
      });
    } catch (error) {
      console.error("Error evaluating loan:", error);
      res.status(500).json({ message: "Error evaluating loan application" });
    }
  });

  // API route to get evaluation history from database
  app.get("/api/evaluation-history", async (req, res) => {
    try {
      const evaluations = await storage.getLoanApplications();
      res.json(evaluations);
    } catch (error) {
      console.error("Error fetching evaluation history:", error);
      res.status(500).json({ message: "Error fetching evaluation history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateDifferences(traditionalApproved: boolean, ethicalApproved: boolean, gender: string): string {
  if (traditionalApproved === ethicalApproved) {
    return `Both evaluation methods reached the same conclusion, but through different approaches:
- Traditional evaluation may have considered demographic factors along with financial ones
- Azure AI Foundry evaluation focused exclusively on objective financial behavior
- The ethical approach provides more transparent reasoning based solely on financial risk factors`;
  } else if (!traditionalApproved && ethicalApproved) {
    return `The evaluations reached different conclusions:
- Traditional evaluation denied the loan, possibly influenced by demographic factors
- Azure AI Foundry evaluation approved the loan based on financial factors only
- This demonstrates how removing potential bias can identify qualified borrowers who might otherwise be rejected
${gender === "female" ? '- This case shows how gender bias can affect traditional lending decisions' : ''}`;
  } else {
    return `The evaluations reached different conclusions:
- Traditional evaluation approved the loan, potentially overlooking financial risk factors
- Azure AI Foundry evaluation denied the loan based on objective financial assessment
- The ethical approach helps prevent approving loans that may lead to financial hardship for borrowers`;
  }
}
