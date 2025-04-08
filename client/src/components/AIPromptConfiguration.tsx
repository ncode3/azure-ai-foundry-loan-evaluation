import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Edit, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function AIPromptConfiguration() {
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({
    system: false,
    user: false
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus({ ...copyStatus, [key]: true });
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, [key]: false });
    }, 2000);
  };

  const systemPrompt = `You are an ethical AI-powered loan approval agent for Azure AI Foundry. Your task is to analyze loan applications without bias, using only relevant financial factors.`;

  const userPrompt = `Evaluate this loan application using both traditional and ethical frameworks:

APPLICANT INFO:
- Income: {{income}}
- Credit Score: {{creditScore}}
- Employment Status: {{employmentStatus}}
- Gender: {{gender}}
- Missed Payments: {{missedPayments}}
- Loan Amount: {{loanAmount}}

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
Provide both evaluations in JSON format with "approved" (boolean), "reason" (string), and "analysis" (array of factor objects)`;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
          Azure AI Foundry Prompt Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#424242]">System Prompt</label>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-[#8661C5] hover:text-[#7050B0]">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#8661C5] hover:text-[#7050B0]"
                onClick={() => handleCopy(systemPrompt, "system")}
              >
                {copyStatus.system ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copyStatus.system ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="bg-[#2D2D2D] text-[#E0E0E0] p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
            {systemPrompt}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-[#424242]">User Prompt</label>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-[#8661C5] hover:text-[#7050B0]">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#8661C5] hover:text-[#7050B0]"
                onClick={() => handleCopy(userPrompt, "user")}
              >
                {copyStatus.user ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copyStatus.user ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="bg-[#2D2D2D] text-[#E0E0E0] p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
            {userPrompt}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#0078D4]/5 via-[#8661C5]/5 to-[#E74C84]/5 p-4 rounded-md border border-[#8661C5]/20">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-[#8661C5] mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-[#424242] mb-1">Azure AI Foundry Responsible AI</h4>
              <p className="text-sm text-[#424242]">
                Our system intentionally implements ethical guardrails by directing the AI to evaluate loans based solely on 
                financial factors. By comparing traditional and ethical evaluations side-by-side, we demonstrate how Azure 
                AI Foundry can reduce bias while maintaining effective risk assessment.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
