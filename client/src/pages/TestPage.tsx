import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTestClick = async () => {
    try {
      setLoading(true);
      
      const testData = {
        income: 85000,
        creditScore: 720,
        employmentStatus: "Employed",
        gender: "female",
        missedPayments: "1",
        loanAmount: 125000
      };
      
      console.log("Submitting test data:", testData);
      
      const response = await fetch("http://localhost:5000/api/evaluate-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("API call failed:", error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="mb-4">
        <Button
          onClick={handleTestClick}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Testing..." : "Test API Now"}
        </Button>
      </div>
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 border border-gray-300">{result}</pre>
        </div>
      )}
    </div>
  );
}