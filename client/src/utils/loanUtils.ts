export function calculateLoanToIncomeRatio(loanAmount: number, income: number): number {
  return loanAmount / income;
}

export function assessCreditScore(score: number): string {
  if (score >= 750) return "Excellent";
  if (score >= 700) return "Good";
  if (score >= 650) return "Fair";
  if (score >= 600) return "Poor";
  return "Very Poor";
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    maximumFractionDigits: 0 
  }).format(amount);
}

export function analysisFactorToText(factor: string, value: string, assessment: string): string {
  return `${factor}: ${value} (${assessment})`;
}
