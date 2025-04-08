import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { type LoanApplicationData } from "@/pages/LoanEvaluation";

const formSchema = z.object({
  income: z.coerce.number().positive("Income must be positive").min(10000, "Income must be at least $10,000"),
  creditScore: z.coerce.number().min(300, "Credit score must be at least 300").max(850, "Credit score cannot exceed 850"),
  employmentStatus: z.string().min(1, "Please select employment status"),
  gender: z.string().min(1, "Please select gender"),
  missedPayments: z.string().min(1, "Please select missed payments"),
  loanAmount: z.coerce.number().positive("Loan amount must be positive").min(1000, "Loan amount must be at least $1,000"),
});

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
  const form = useForm<LoanApplicationData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 85000,
      creditScore: 720,
      employmentStatus: "Employed",
      gender: "female",
      missedPayments: "1",
      loanAmount: 125000,
    }
  });

  const handleSubmit = (data: LoanApplicationData) => {
    onSubmit(data);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#424242]">Annual Income ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="border-[#E0E0E0] focus-visible:ring-[#0078D4]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="creditScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#424242]">Credit Score</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={300} 
                        max={850} 
                        {...field} 
                        className="border-[#E0E0E0] focus-visible:ring-[#0078D4]" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#424242]">Employment Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#E0E0E0] focus:ring-[#0078D4]">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                        <SelectItem value="Unemployed">Unemployed</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#424242]">Loan Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="border-[#E0E0E0] focus-visible:ring-[#0078D4]" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#424242] flex items-center">
                      Gender
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-1 cursor-help text-[#9E9E9E]">
                              <InfoIcon size={16} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs">
                              While gender is collected for regulatory reporting, our AI system is specifically instructed not to consider this factor in loan evaluation decisions.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#E0E0E0] focus:ring-[#0078D4]">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="missedPayments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#424242]">Recent Missed Payments</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-[#E0E0E0] focus:ring-[#0078D4]">
                          <SelectValue placeholder="Select missed payments" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3+">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Button 
                type="button" 
                className="bg-[#0078D4] hover:bg-[#106EBE]"
                onClick={() => {
                  const values = form.getValues();
                  handleSubmit(values);
                }}
              >
                Evaluate Loan Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
