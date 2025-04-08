import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function AIPromptConfiguration() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#424242]">Azure AI Foundry Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#424242]">System Prompt</label>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-[#0078D4] hover:text-[#106EBE]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-[#0078D4] hover:text-[#106EBE]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
                Copy
              </Button>
            </div>
          </div>
          <div className="bg-[#424242] text-white p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
            You are a helpful assistant providing loan applicant summaries.
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#424242]">User Prompt</label>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-[#0078D4] hover:text-[#106EBE]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-[#0078D4] hover:text-[#106EBE]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
                Copy
              </Button>
            </div>
          </div>
          <div className="bg-[#424242] text-white p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
{`Generate a concise, neutral summary of this loan applicant:
Income: {{ inputs.applicant_data.income }}
Credit Score: {{ inputs.CreateScore }}
Employment Status: {{ inputs.employment_st }}
Gender: {{ inputs.gender }}
Missed Payments: {{ inputs.applicant_data.missed_payments }}
Loan Amount: {{ inputs.loan_amount }}

Explicitly focus only on financial factors. Do NOT consider gender or any demographic factors in your evaluation. Base your assessment solely on income, credit score, employment stability, payment history, and loan amount relative to income. Provide a clear recommendation (Approve/Deny) with specific financial reasoning.`}
          </div>
        </div>

        <div className="bg-[#E1EFFF] p-4 rounded-md">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-0.5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <div>
              <h4 className="font-medium text-[#424242] mb-1">Responsible AI Approach</h4>
              <p className="text-sm text-[#424242]">
                Notice how our system prompt explicitly instructs the AI to ignore demographic factors like gender and focus solely on financial behavior patterns. This intentional design helps avoid bias in loan evaluations while maintaining effective risk assessment.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
