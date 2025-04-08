import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export default function EvaluationHistory() {
  const { data: evaluations, isLoading } = useQuery({
    queryKey: ["/api/evaluation-history"],
  });

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#424242] mb-2">Evaluation History</h2>
        <p className="text-[#9E9E9E] max-w-3xl">
          View the history of all loan evaluations conducted through the Azure AI Foundry platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Evaluations</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0078D4]"></div>
            </div>
          ) : evaluations && evaluations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Traditional Result</TableHead>
                  <TableHead>Ethical Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((evaluation, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(evaluation.applicationDate).toLocaleDateString()}</TableCell>
                    <TableCell>${evaluation.income.toLocaleString()}</TableCell>
                    <TableCell>{evaluation.creditScore}</TableCell>
                    <TableCell>${evaluation.loanAmount.toLocaleString()}</TableCell>
                    <TableCell className={evaluation.traditionalEvaluation.approved ? "text-[#107C10]" : "text-[#A80000]"}>
                      {evaluation.traditionalEvaluation.approved ? "Approved" : "Denied"}
                    </TableCell>
                    <TableCell className={evaluation.ethicalEvaluation.approved ? "text-[#107C10]" : "text-[#A80000]"}>
                      {evaluation.ethicalEvaluation.approved ? "Approved" : "Denied"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center text-[#9E9E9E]">
              <p>No evaluation history available yet.</p>
              <p className="text-sm mt-2">Submit a loan application to see results here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
