import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY || "sk-demo-key"
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
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant providing loan applicant summaries."
        },
        {
          role: "user",
          content: `Generate a concise, neutral summary of this loan applicant:
Income: ${applicantData.income}
Credit Score: ${applicantData.creditScore}
Employment Status: ${applicantData.employmentStatus}
Gender: ${applicantData.gender}
Missed Payments: ${applicantData.missedPayments}
Loan Amount: ${applicantData.loanAmount}

Explicitly focus only on financial factors. Do NOT consider gender or any demographic factors in your evaluation. Base your assessment solely on income, credit score, employment stability, payment history, and loan amount relative to income. Provide a clear recommendation (Approve/Deny) with specific financial reasoning.

Return your response as a JSON object in this format:
{
  "approved": boolean,
  "reason": "string with brief explanation",
  "analysis": [
    {
      "factor": "Credit Score",
      "value": "the value",
      "assessment": "assessment of this factor"
    },
    ...additional factors
  ]
}`
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
