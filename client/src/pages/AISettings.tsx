import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Info, Sliders, ExternalLink, Settings, Terminal } from "lucide-react";
import { useState } from "react";

export default function AISettings() {
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState(
    `You are an ethical AI-powered loan approval agent for Azure AI Foundry. Your task is to analyze loan applications without bias, using only relevant financial factors.`
  );
  
  const [userPrompt, setUserPrompt] = useState(
    `Evaluate this loan application using both traditional and ethical frameworks:

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
Provide both evaluations in JSON format with "approved" (boolean), "reason" (string), and "analysis" (array of factor objects)`
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">AI Settings</h1>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
              Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select defaultValue="gpt-4o">
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">Azure GPT-4o (Default)</SelectItem>
                  <SelectItem value="gpt-35-turbo">Azure GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="azure-llama3">Azure Llama 3 70B</SelectItem>
                  <SelectItem value="claude3">Azure Claude 3 Opus</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose the AI model for loan evaluation
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature: {temperature.toFixed(1)}</Label>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Deterministic (0.0)</span>
                <span>Creative (2.0)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="streaming">Streaming responses</Label>
                <Switch id="streaming" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable real-time response streaming for faster evaluation
              </p>
            </div>

            <div className="pt-2">
              <Button variant="secondary" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                Connect to Azure OpenAI Service
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
              Evaluation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="bias-detection">Bias Detection Level</Label>
              <Select defaultValue="high">
                <SelectTrigger id="bias-detection">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Default)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Configure sensitivity for detecting bias in evaluation
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="require-explanation">Require explanations</Label>
                <Switch id="require-explanation" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Ensure AI provides detailed explanations for all decisions
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-monitoring">Enable monitoring</Label>
                <Switch id="enable-monitoring" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">
                Track evaluation metrics and bias indicators over time
              </p>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full gap-2">
                <Sliders className="h-4 w-4" />
                Advanced Calibration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
            Prompt Engineering
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="system">
            <TabsList className="mb-4">
              <TabsTrigger value="system">System Prompt</TabsTrigger>
              <TabsTrigger value="user">User Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="system" className="space-y-4">
              <Textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={5}
                className="font-mono text-sm"
              />
              <div className="bg-muted rounded-md p-4 flex items-start">
                <Info className="mt-0.5 h-5 w-5 text-[#8661C5] mr-3" />
                <div className="text-sm">
                  <p className="font-medium mb-1">System Prompt Best Practices</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Clearly define the AI's role as an ethical loan evaluator</li>
                    <li>Establish upfront that evaluation should avoid demographic bias</li>
                    <li>Focus on objective financial criteria for decision-making</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="user" className="space-y-4">
              <Textarea 
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={15}
                className="font-mono text-sm"
              />
              <div className="bg-muted rounded-md p-4 flex items-start">
                <Terminal className="mt-0.5 h-5 w-5 text-[#8661C5] mr-3" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Available Variables</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-muted-foreground">
                    <div><code>{"{{income}}"}</code> - Applicant income</div>
                    <div><code>{"{{creditScore}}"}</code> - Credit score</div>
                    <div><code>{"{{employmentStatus}}"}</code> - Employment</div>
                    <div><code>{"{{gender}}"}</code> - Gender</div>
                    <div><code>{"{{missedPayments}}"}</code> - Payment history</div>
                    <div><code>{"{{loanAmount}}"}</code> - Requested amount</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex gap-2 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}