import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type EvaluationResult } from "@/pages/LoanEvaluation";

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
                <Badge variant={traditionalEvaluation.approved ? "default" : "destructive"} className={traditionalEvaluation.approved ? "bg-[#107C10]" : "bg-[#D83B01]"}>
                  {traditionalEvaluation.approved ? "Approved" : "Caution"}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-[#424242]">
                  <p className="mb-3">
                    <strong className={traditionalEvaluation.approved ? "text-[#107C10]" : "text-[#A80000]"}>
                      Recommendation: {traditionalEvaluation.approved ? "Approve" : "Deny"}
                    </strong>
                  </p>
                  
                  <p className="mb-2">Analysis:</p>
                  <ul className="list-disc pl-5 mb-3">
                    {traditionalEvaluation.analysis.map((item, index) => (
                      <li key={index}>
                        {item.factor}: {item.value} ({item.assessment})
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
              <Badge variant={ethicalEvaluation.approved ? "default" : "destructive"} className={ethicalEvaluation.approved ? "bg-[#107C10]" : "bg-[#A80000]"}>
                {ethicalEvaluation.approved ? "Approved" : "Denied"}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-[#424242]">
                <p className="mb-3">
                  <strong className={ethicalEvaluation.approved ? "text-[#107C10]" : "text-[#A80000]"}>
                    Recommendation: {ethicalEvaluation.approved ? "Approve" : "Deny"}
                  </strong>
                </p>
                
                <p className="mb-2">Financial Analysis:</p>
                <ul className="list-disc pl-5 mb-3">
                  {ethicalEvaluation.analysis.map((item, index) => (
                    <li key={index}>
                      {item.factor}: {item.value} ({item.assessment})
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
            <h4 className="font-medium text-[#424242] mb-2">Key Differences Explained</h4>
            <div className="text-sm text-[#424242]">
              {differencesList.map((item, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
