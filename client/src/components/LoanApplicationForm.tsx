import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { InfoIcon } from "lucide-react";
import { type LoanApplicationData } from "@/pages/LoanEvaluation";

interface LoanApplicationFormProps {
  onSubmit: (data: LoanApplicationData) => void;
  compareEnabled: boolean;
  onCompareToggle: (enabled: boolean) => void;
}

export default function LoanApplicationForm({ 
  onSubmit, 
  compareEnabled,
  onCompareToggle
}: LoanApplicationFormProps) {
  const [formData, setFormData] = useState<LoanApplicationData>({
    income: 85000,
    creditScore: 720,
    employmentStatus: "Employed",
    gender: "female",
    missedPayments: "1",
    loanAmount: 125000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "income" || name === "creditScore" || name === "loanAmount" 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex-row justify-between items-center pb-0">
        <h3 className="text-lg font-semibold text-[#424242]">Loan Application Data</h3>
        <div className="flex items-center">
          <span className="text-sm text-[#9E9E9E] mr-2">Compare with Traditional Evaluation</span>
          <Switch 
            checked={compareEnabled}
            onCheckedChange={onCompareToggle}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="income" className="text-sm font-medium text-[#424242]">
                Annual Income ($)
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="w-full rounded-md border border-[#E0E0E0] p-2 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="creditScore" className="text-sm font-medium text-[#424242]">
                Credit Score
              </label>
              <input
                type="number"
                id="creditScore"
                name="creditScore"
                min={300}
                max={850}
                value={formData.creditScore}
                onChange={handleChange}
                className="w-full rounded-md border border-[#E0E0E0] p-2 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="employmentStatus" className="text-sm font-medium text-[#424242]">
                Employment Status
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full rounded-md border border-[#E0E0E0] p-2 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
              >
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="loanAmount" className="text-sm font-medium text-[#424242]">
                Loan Amount ($)
              </label>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                className="w-full rounded-md border border-[#E0E0E0] p-2 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-[#424242] flex items-center">
                Gender
                <span className="ml-1 text-[#9E9E9E]" title="While gender is collected for regulatory reporting, our AI system is specifically instructed not to consider this factor in loan evaluation decisions.">
                  <InfoIcon size={16} />
                </span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-md border border-[#E0E0E0] p-2 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="missedPayments" className="text-sm font-medium text-[#424242]">
                Recent Missed Payments
              </label>
              <select
                id="missedPayments"
                name="missedPayments"
                value={formData.missedPayments}
                onChange={handleChange}
                className="w-full rounded-md border border-[#E0E0E0] p-2 focus:outline-none focus:ring-2 focus:ring-[#0078D4]"
              >
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <Button 
              onClick={handleSubmit}
              className="bg-[#0078D4] hover:bg-[#106EBE]"
            >
              Evaluate Loan Application
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
