import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export interface LoanApplicantData {
  income: number;
  creditScore: number;
  employmentStatus: string;
  gender: string;
  missedPayments: string;
  loanAmount: number;
}

export interface TraditionalEvaluation {
  approved: boolean;
  reason: string;
  analysis: Array<{
    factor: string;
    value: string;
    assessment: string;
  }>;
}

export interface EthicalEvaluation {
  approved: boolean;
  reason: string;
  analysis: Array<{
    factor: string;
    value: string;
    assessment: string;
  }>;
}

export async function generateEthicalEvaluation(
  applicantData: LoanApplicantData
): Promise<EthicalEvaluation> {
  try {
    // Azure AI Foundry System Prompt
    const systemPrompt = `You are an ethical AI-powered loan approval agent for Azure AI Foundry. Your task is to analyze loan applications without bias, using only relevant financial factors.`;

    // Azure AI Foundry User Prompt
    const userPrompt = `Evaluate this loan application using both traditional and ethical frameworks:

APPLICANT INFO:
- Income: ${applicantData.income}
- Credit Score: ${applicantData.creditScore}
- Employment Status: ${applicantData.employmentStatus}
- Gender: ${applicantData.gender}
- Missed Payments: ${applicantData.missedPayments}
- Loan Amount: ${applicantData.loanAmount}

FOR TRADITIONAL EVALUATION:
Use standard financial lending criteria like income-to-loan ratio, credit score, employment stability, payment history, and calculate risk according to industry standards. You may consider all factors provided.

FOR ETHICAL EVALUATION:
Analyze the same loan application using Azure AI Foundry's ethical framework:
1. Focus ONLY on financial behavior patterns (payment history, debt-to-income ratio)
2. DO NOT consider gender or any demographic attributes
3. Evaluate ability to repay based on income stability and financial responsibility
4. Apply consistent standards across all demographic groups
5. Provide specific reasons for approval/denial based only on financial factors

RESPONSE FORMAT: 
Provide ONLY the ethical evaluation results in JSON format with "approved" (boolean), "reason" (string), and "analysis" (array of factor objects)`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content) as EthicalEvaluation;
    return result;
  } catch (error) {
    console.error("Error generating ethical evaluation:", error);
    // Fallback evaluation in case of API failure
    return {
      approved: applicantData.creditScore >= 680 && 
                applicantData.employmentStatus !== "Unemployed" && 
                (applicantData.loanAmount / applicantData.income) <= 1.5 &&
                applicantData.missedPayments !== "3+",
      reason: "Evaluation based on financial factors only (fallback due to API error).",
      analysis: [
        {
          factor: "Credit Score",
          value: applicantData.creditScore.toString(),
          assessment: applicantData.creditScore >= 700 ? "Good" : applicantData.creditScore >= 650 ? "Fair" : "Poor"
        },
        {
          factor: "Loan-to-Income Ratio",
          value: (applicantData.loanAmount / applicantData.income).toFixed(2),
          assessment: (applicantData.loanAmount / applicantData.income) <= 1.5 ? "Acceptable" : "High"
        },
        {
          factor: "Employment Stability",
          value: applicantData.employmentStatus,
          assessment: applicantData.employmentStatus === "Unemployed" ? "Concerning" : "Acceptable"
        },
        {
          factor: "Recent Payment History",
          value: applicantData.missedPayments,
          assessment: applicantData.missedPayments === "0" ? "Perfect" : applicantData.missedPayments === "1" ? "Minor issues" : "Concerning"
        }
      ]
    };
  }
}

export function generateTraditionalEvaluation(
  applicantData: LoanApplicantData
): TraditionalEvaluation {
  // Simulate traditional evaluation with potential gender bias
  let approved = true;
  let reason = "Financial factors indicate acceptable risk level.";
  
  // Some simplified bias-prone rules for demonstration
  if (applicantData.creditScore < 680) {
    approved = false;
    reason = "Credit score below threshold.";
  } else if (applicantData.employmentStatus === "Unemployed") {
    approved = false;
    reason = "Unemployed applicants present higher risk.";
  } else if ((applicantData.loanAmount / applicantData.income) > 1.5) {
    approved = false;
    reason = "Loan amount too high relative to income.";
  } else if (applicantData.missedPayments === "2" || applicantData.missedPayments === "3+") {
    approved = false;
    reason = "Multiple recent missed payments indicate higher risk.";
  } else if (applicantData.gender === "female" && applicantData.missedPayments === "1") {
    // Simulate gender bias for demonstration
    approved = false;
    reason = "Recent payment history suggests potential repayment difficulties.";
  }
  
  const loanToIncomeRatio = (applicantData.loanAmount / applicantData.income).toFixed(2);
  
  // Create analysis with potential bias
  const analysis = [
    {
      factor: "Credit Score",
      value: applicantData.creditScore.toString(),
      assessment: applicantData.creditScore >= 700 ? "Good" : applicantData.creditScore >= 650 ? "Fair" : "Poor"
    },
    {
      factor: "Loan-to-Income Ratio",
      value: loanToIncomeRatio,
      assessment: (applicantData.loanAmount / applicantData.income) <= 1.5 ? "Acceptable" : "High"
    },
    {
      factor: "Employment",
      value: applicantData.employmentStatus,
      assessment: applicantData.employmentStatus === "Unemployed" ? "High Risk" : "Acceptable"
    },
    {
      factor: "Missed Payments",
      value: applicantData.missedPayments,
      assessment: applicantData.missedPayments === "0" ? "Good" : "Concerning"
    }
  ];
  
  // Add biased demographic assessment for female applicants with any missed payments
  if (applicantData.gender === "female" && applicantData.missedPayments !== "0") {
    analysis.push({
      factor: "Demographic Risk",
      value: "Higher than average",
      assessment: "Statistical correlations suggest higher risk"
    });
  }
  
  return { approved, reason, analysis };
}
