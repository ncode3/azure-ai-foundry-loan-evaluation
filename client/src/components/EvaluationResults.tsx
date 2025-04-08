import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type EvaluationResult } from "@/pages/LoanEvaluation";
import { Check, AlertTriangle, ArrowRight } from "lucide-react";

interface EvaluationResultsProps {
  traditionalEvaluation: EvaluationResult;
  ethicalEvaluation: EvaluationResult;
  differences: string;
  showComparison: boolean;
}

export default function EvaluationResults({
  traditionalEvaluation,
  ethicalEvaluation,
  differences,
  showComparison
}: EvaluationResultsProps) {
  // Create list items from differences string
  const differencesList = differences.split('\n- ').map((item, index) => {
    if (index === 0) return item;
    return `- ${item}`;
  });

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#424242]">Loan Evaluation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Evaluation */}
          {showComparison && (
            <div className="border border-[#E0E0E0] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-[#424242]">Traditional Evaluation</h4>
                <Badge variant={traditionalEvaluation.approved ? "default" : "destructive"} className={traditionalEvaluation.approved ? "bg-[#107C10]" : "bg-[#D83B01] flex items-center gap-1"}>
                  {traditionalEvaluation.approved ? <><Check className="h-3 w-3" /> Approved</> : <><AlertTriangle className="h-3 w-3" /> Denied</>}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-[#424242]">
                  <p className="mb-3">
                    <strong className={traditionalEvaluation.approved ? "text-[#107C10]" : "text-[#A80000]"}>
                      Recommendation: {traditionalEvaluation.approved ? "Approve" : "Deny"}
                    </strong>
                  </p>
                  
                  <p className="mb-2 font-medium">Analysis:</p>
                  <ul className="pl-4 mb-3 space-y-2">
                    {traditionalEvaluation.analysis.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
                          item.assessment === "Good" ? "bg-[#DFF6DD] text-[#107C10]" : 
                          item.assessment === "Acceptable" ? "bg-[#FFF4CE] text-[#9D5D00]" : 
                          "bg-[#FDE7E9] text-[#A80000]"
                        }`}>
                          {item.assessment === "Good" ? 
                            <Check className="h-3 w-3" /> : 
                            item.assessment === "Acceptable" ? 
                            "!" : 
                            <AlertTriangle className="h-3 w-3" />
                          }
                        </div>
                        <div>
                          <span className="font-medium">{item.factor}: </span>
                          <span>{item.value} </span>
                          <span className={`italic ${
                            item.assessment === "Good" ? "text-[#107C10]" : 
                            item.assessment === "Acceptable" ? "text-[#9D5D00]" : 
                            "text-[#A80000]"
                          }`}>
                            ({item.assessment})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p><strong>Reason: </strong>{traditionalEvaluation.reason}</p>
                </div>
                
                <div className="bg-[#F5F5F5] p-3 rounded-md">
                  <h5 className="text-sm font-medium text-[#424242] mb-1">Problems with this approach:</h5>
                  <ul className="text-xs text-[#424242] list-disc pl-5 space-y-1">
                    <li>May inadvertently consider demographic factors</li>
                    <li>Potential for geographic or demographic bias</li>
                    <li>Higher false positive rate for applicants from certain groups</li>
                    <li>Less transparent decision making</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Ethical AI Evaluation */}
          <div className={`border-2 border-[#0078D4] rounded-lg p-4 ${!showComparison ? "md:col-span-2" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-[#424242]">Azure AI Foundry Ethical Evaluation</h4>
              <Badge variant={ethicalEvaluation.approved ? "default" : "destructive"} className={ethicalEvaluation.approved ? "bg-[#107C10] flex items-center gap-1" : "bg-[#A80000] flex items-center gap-1"}>
                {ethicalEvaluation.approved ? <><Check className="h-3 w-3" /> Approved</> : <><AlertTriangle className="h-3 w-3" /> Denied</>}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-[#424242]">
                <p className="mb-3">
                  <strong className={ethicalEvaluation.approved ? "text-[#107C10]" : "text-[#A80000]"}>
                    Recommendation: {ethicalEvaluation.approved ? "Approve" : "Deny"}
                  </strong>
                </p>
                
                <p className="mb-2 font-medium">Financial Analysis:</p>
                <ul className="pl-4 mb-3 space-y-2">
                  {ethicalEvaluation.analysis.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-[#E1EFFF] text-[#0078D4] flex items-center justify-center mr-2 flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <span className="font-medium">{item.factor}: </span>
                        <span>{typeof item.value === 'number' ? item.value : item.value} </span>
                        <span className="italic text-[#0078D4]">
                          {item.comment ? `(${item.comment})` : item.assessment ? `(${item.assessment})` : ''}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p><strong>Reason: </strong>{ethicalEvaluation.reason}</p>
              </div>
              
              <div className="bg-[#E1EFFF] p-3 rounded-md">
                <h5 className="text-sm font-medium text-[#424242] mb-1">Benefits of this approach:</h5>
                <ul className="text-xs text-[#424242] list-disc pl-5 space-y-1">
                  <li>Focuses exclusively on financial behavior patterns</li>
                  <li>Removes potential demographic bias</li>
                  <li>Transparent reasoning based on financial factors</li>
                  <li>Complies with fair lending regulations</li>
                  <li>Expands addressable market by focusing on real risk factors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {showComparison && (
          <div className="mt-6 p-4 bg-[#F5F5F5] rounded-md">
            <h4 className="font-medium text-[#424242] mb-2 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-[#0078D4]" />
              Key Differences Explained
            </h4>
            <div className="text-sm text-[#424242]">
              {differencesList.map((item, index) => (
                <p key={index} className={index > 0 ? "mt-2 flex items-start" : "flex items-start"}>
                  {index > 0 && <ArrowRight className="h-3 w-3 mr-1 mt-1 text-[#0078D4] flex-shrink-0" />}
                  <span>{index === 0 ? item : item.substring(2)}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
