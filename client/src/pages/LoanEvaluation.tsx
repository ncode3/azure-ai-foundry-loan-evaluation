import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import LoanApplicationForm from "@/components/LoanApplicationForm";
import AIPromptConfiguration from "@/components/AIPromptConfiguration";
import EvaluationResults from "@/components/EvaluationResults";
import LoadingIndicator from "@/components/LoadingIndicator";
import EthicalAIFeatures from "@/components/EthicalAIFeatures";

export interface LoanApplicationData {
  income: number;
  creditScore: number;
  employmentStatus: string;
  gender: string;
  missedPayments: string;
  loanAmount: number;
}

export interface EvaluationFactor {
  factor: string;
  value: string;
  assessment: string;
}

export interface EvaluationResult {
  approved: boolean;
  reason: string;
  analysis: EvaluationFactor[];
}

export interface EvaluationResponse {
  traditionalEvaluation: EvaluationResult;
  ethicalEvaluation: EvaluationResult;
  differences: string;
}

export default function LoanEvaluation() {
  const [compareEnabled, setCompareEnabled] = useState(true);
  const [evaluationResults, setEvaluationResults] = useState<EvaluationResponse | null>(null);
  const { toast } = useToast();

  const evaluateLoanMutation = useMutation({
    mutationFn: async (data: LoanApplicationData) => {
      const response = await apiRequest("POST", "/api/evaluate-loan", data);
      return await response.json() as EvaluationResponse;
    },
    onSuccess: (data) => {
      setEvaluationResults(data);
      window.scrollTo({
        top: document.getElementById("results-section")?.offsetTop || 0,
        behavior: "smooth",
      });
    },
    onError: (error) => {
      toast({
        title: "Error evaluating loan",
        description: error.message || "There was an error processing your request.",
        variant: "destructive",
      });
    },
  });

  const handleLoanSubmit = (formData: LoanApplicationData) => {
    evaluateLoanMutation.mutate(formData);
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#424242] mb-2">Ethical Loan Evaluation Demo</h2>
        <p className="text-[#9E9E9E] max-w-3xl">
          This demo showcases how Azure AI Foundry addresses a critical challenge faced by financial institutions: 
          reducing bias in lending decisions while maintaining regulatory compliance and effective risk management.
        </p>
      </div>

      <LoanApplicationForm 
        onSubmit={handleLoanSubmit} 
        compareEnabled={compareEnabled}
        onCompareToggle={(enabled) => setCompareEnabled(enabled)}
      />

      <AIPromptConfiguration />

      {evaluateLoanMutation.isPending && (
        <LoadingIndicator message="Processing loan application through Azure AI Foundry..." />
      )}

      {evaluationResults && !evaluateLoanMutation.isPending && (
        <div id="results-section">
          <EvaluationResults 
            traditionalEvaluation={evaluationResults.traditionalEvaluation}
            ethicalEvaluation={evaluationResults.ethicalEvaluation}
            differences={evaluationResults.differences}
            showComparison={compareEnabled}
          />
        </div>
      )}

      <EthicalAIFeatures />
    </>
  );
}
