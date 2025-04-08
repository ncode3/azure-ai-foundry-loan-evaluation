import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Book, Code, BookOpen, ExternalLink, Video, Download, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Documentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (codeId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Azure AI Foundry Documentation</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground">
        Learn how to use Azure AI Foundry for ethical loan evaluation and financial decision-making.
      </p>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quickstart">Quickstart</TabsTrigger>
          <TabsTrigger value="reference">API Reference</TabsTrigger>
          <TabsTrigger value="responsible-ai">Responsible AI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                What is Azure AI Foundry?
              </CardTitle>
              <CardDescription>
                Learn about Azure AI Foundry and its ethical loan evaluation capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Azure AI Foundry is an integrated platform within Microsoft Azure's AI services that helps organizations build, deploy, and manage responsible AI applications. 
                It provides a comprehensive suite of tools designed specifically for creating ethical and unbiased AI systems in regulated industries.
              </p>
              
              <h3 className="text-base font-semibold mt-6">Key features of Azure AI Foundry</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Pre-built AI models:</strong> Access Microsoft's state-of-the-art foundation models, fine-tuned for specific industry scenarios.
                </li>
                <li>
                  <strong>Bias detection and mitigation:</strong> Tools to identify and reduce bias across demographic factors in your AI applications.
                </li>
                <li>
                  <strong>Continuous model evaluation:</strong> Automated systems to monitor model performance and detect drift or fairness issues.
                </li>
                <li>
                  <strong>Robust governance:</strong> Templates and workflows for responsible AI development following Microsoft's AI principles.
                </li>
                <li>
                  <strong>Azure integration:</strong> Seamless connectivity with Azure's data, security, and compliance infrastructure.
                </li>
              </ul>
              
              <h3 className="text-base font-semibold mt-6">Ethical loan evaluation with Azure AI Foundry</h3>
              <p>
                This demonstration showcases how Azure AI Foundry can be used to evaluate loan applications with both traditional and ethical frameworks. 
                It highlights:
              </p>
              <ul className="space-y-2">
                <li>Side-by-side comparison of traditional vs. bias-reduced evaluation</li>
                <li>Transparent decision-making processes with detailed factor analysis</li>
                <li>Configuration options to fine-tune ethical parameters</li>
                <li>Integration with existing banking and financial systems</li>
              </ul>
              
              <div className="not-prose bg-gradient-to-r from-[#0078D4]/5 via-[#8661C5]/5 to-[#E74C84]/5 p-4 rounded-md border border-[#8661C5]/20 mt-6">
                <h4 className="font-medium text-base mb-2">Learn more about Azure AI services</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <a href="https://learn.microsoft.com/en-us/azure/ai-services/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <FileText className="h-4 w-4" />
                    Azure AI services documentation
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <FileText className="h-4 w-4" />
                    Azure OpenAI Service data & privacy
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/azure/ai-services/openai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <FileText className="h-4 w-4" />
                    Azure OpenAI Service
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/azure/machine-learning/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <FileText className="h-4 w-4" />
                    Azure Machine Learning
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quickstart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Quickstart: Set up your first ethical evaluator
              </CardTitle>
              <CardDescription>
                Learn how to set up and deploy an ethical loan evaluation model
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-base font-semibold mt-0">Prerequisites</h3>
              <ul>
                <li>An Azure account with an active subscription</li>
                <li>Access to Azure OpenAI Service</li>
                <li>Basic familiarity with Azure resources</li>
              </ul>

              <h3 className="text-base font-semibold mt-6">Step 1: Set up Azure resources</h3>
              <p>Start by creating the necessary Azure resources:</p>
              <ol>
                <li>Sign in to the <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer" className="text-[#8661C5] hover:underline">Azure portal</a></li>
                <li>Create a new Azure OpenAI Service resource</li>
                <li>Deploy a GPT-4 or GPT-3.5 Turbo model</li>
                <li>Note your endpoint and API key for later use</li>
              </ol>

              <h3 className="text-base font-semibold mt-6">Step 2: Configure your model with ethical prompts</h3>
              <p>Use the following system prompt to configure your model for ethical evaluation:</p>

              <div className="bg-[#2D2D2D] text-[#E0E0E0] p-4 rounded-md font-mono text-sm my-4 relative">
                <button 
                  className="absolute top-2 right-2 p-1 rounded hover:bg-gray-700" 
                  onClick={() => handleCopyCode('systemPrompt', 'You are an ethical AI-powered loan approval agent for Azure AI Foundry. Your task is to analyze loan applications without bias, using only relevant financial factors.')}
                >
                  {copiedCode === 'systemPrompt' ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <pre className="whitespace-pre-wrap">You are an ethical AI-powered loan approval agent for Azure AI Foundry. Your task is to analyze loan applications without bias, using only relevant financial factors.</pre>
              </div>

              <h3 className="text-base font-semibold mt-6">Step 3: Implement API integration</h3>
              <p>Use the following code to integrate with Azure OpenAI Service for evaluations:</p>

              <div className="bg-[#2D2D2D] text-[#E0E0E0] p-4 rounded-md font-mono text-sm my-4 relative">
                <button 
                  className="absolute top-2 right-2 p-1 rounded hover:bg-gray-700" 
                  onClick={() => handleCopyCode('apiCode', "// Azure OpenAI Service Integration\nconst azureOpenAI = require('@azure/openai');\n\n// Azure OpenAI configuration\nconst endpoint = process.env.AZURE_OPENAI_ENDPOINT;\nconst apiKey = process.env.AZURE_OPENAI_API_KEY;\nconst deploymentName = process.env.DEPLOYMENT_NAME;\n\n// Create OpenAI client\nconst client = new azureOpenAI.OpenAIClient(endpoint, new azureOpenAI.AzureKeyCredential(apiKey));\n\nasync function evaluateLoan(applicantData) {\n  const messages = [\n    { role: 'system', content: 'You are an ethical AI-powered loan approval agent...' },\n    { role: 'user', content: `Evaluate this loan application using both traditional and ethical frameworks: ${JSON.stringify(applicantData)}` }\n  ];\n\n  const response = await client.getChatCompletions(deploymentName, messages, {\n    temperature: 0.7,\n    maxTokens: 800,\n  });\n\n  return response.choices[0].message.content;\n}")}
                >
                  {copiedCode === 'apiCode' ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <pre className="whitespace-pre-wrap overflow-x-auto">// Azure OpenAI Service Integration
const azureOpenAI = require(&apos;@azure/openai&apos;);

// Azure OpenAI configuration
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deploymentName = process.env.DEPLOYMENT_NAME;

// Create OpenAI client
const client = new azureOpenAI.OpenAIClient(endpoint, new azureOpenAI.AzureKeyCredential(apiKey));

async function evaluateLoan(applicantData) {"{"}
  const messages = [
    {"{"}role: &apos;system&apos;, content: &apos;You are an ethical AI-powered loan approval agent...&apos;{"}"},
    {"{"}role: &apos;user&apos;, content: `Evaluate this loan application using both traditional and ethical frameworks: ${"${"}JSON.stringify(applicantData){"}"}` {"}"}
  ];

  const response = await client.getChatCompletions(deploymentName, messages, {"{"}
    temperature: 0.7,
    maxTokens: 800,
  {"}"});

  return response.choices[0].message.content;
{"}"}</pre>
              </div>

              <h3 className="text-base font-semibold mt-6">Step 4: Store evaluation results</h3>
              <p>
                Use Azure Cosmos DB, Azure SQL Database, or another storage solution to save evaluation 
                results for analysis and auditing purposes.
              </p>

              <div className="not-prose bg-[#F5F5F5] p-4 rounded-md mt-6">
                <h4 className="font-medium text-base mb-2">Additional resources</h4>
                <div className="flex flex-col gap-3">
                  <a href="https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/chatgpt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <Book className="h-4 w-4" />
                    Tutorial: Use ChatGPT and GPT-4 with Azure OpenAI Service
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/azure/cosmos-db/introduction" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <Book className="h-4 w-4" />
                    Introduction to Azure Cosmos DB
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/azure/ai-services/authentication?tabs=powershell" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <Book className="h-4 w-4" />
                    Authentication for Azure AI services
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reference" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                API Reference
              </CardTitle>
              <CardDescription>
                Reference documentation for Azure AI Foundry APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h3 className="text-base font-semibold mt-0">Ethical Loan Evaluation API</h3>
              <p>
                The Ethical Loan Evaluation API provides endpoints for analyzing loan applications 
                using both traditional and ethical frameworks.
              </p>

              <div className="bg-[#F5F5F5] p-4 rounded-md my-6">
                <h4 className="font-medium text-base mb-3">POST /api/evaluate-loan</h4>
                <p className="text-sm mb-3">Evaluates a loan application and returns both traditional and ethical assessments.</p>
                
                <div className="mb-4">
                  <h5 className="text-sm font-semibold mb-2">Request body</h5>
                  <div className="bg-[#2D2D2D] text-[#E0E0E0] p-3 rounded-md font-mono text-xs overflow-x-auto">
{`{
  "income": number,          // Applicant's annual income
  "creditScore": number,     // Credit score (300-850)
  "employmentStatus": string, // e.g., "Full-time", "Part-time", "Self-employed"
  "gender": string,          // Applicant's gender
  "missedPayments": string,  // e.g., "None", "1-2", "3+"
  "loanAmount": number       // Requested loan amount
}`}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-semibold mb-2">Response body</h5>
                  <div className="bg-[#2D2D2D] text-[#E0E0E0] p-3 rounded-md font-mono text-xs overflow-x-auto">
{`{
  "traditionalEvaluation": {
    "approved": boolean,
    "reason": string,
    "analysis": [
      {
        "factor": string,
        "value": string,
        "assessment": string
      }
    ]
  },
  "ethicalEvaluation": {
    "approved": boolean,
    "reason": string,
    "analysis": [
      {
        "factor": string,
        "value": string,
        "assessment": string
      }
    ]
  },
  "differences": string
}`}
                  </div>
                </div>
              </div>

              <h3 className="text-base font-semibold mt-6">Client SDKs</h3>
              <p>
                Azure AI Foundry provides official client libraries in multiple languages for integrating with our services:
              </p>
              
              <table className="min-w-full border-collapse border border-gray-300 my-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm">Language</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm">Package</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm">Documentation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">JavaScript/TypeScript</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-xs">@azure/ai-foundry</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      <a href="https://learn.microsoft.com/en-us/javascript/api/@azure/openai" target="_blank" rel="noopener noreferrer" className="text-[#8661C5] hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Python</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-xs">azure-ai-foundry</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      <a href="https://learn.microsoft.com/en-us/python/api/overview/azure/ai-services" target="_blank" rel="noopener noreferrer" className="text-[#8661C5] hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">.NET</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-xs">Azure.AI.Foundry</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      <a href="https://learn.microsoft.com/en-us/dotnet/api/overview/azure/ai.openai-readme" target="_blank" rel="noopener noreferrer" className="text-[#8661C5] hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Java</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono text-xs">com.azure.ai.foundry</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      <a href="https://learn.microsoft.com/en-us/java/api/overview/azure/ai-services" target="_blank" rel="noopener noreferrer" className="text-[#8661C5] hover:underline flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="not-prose bg-[#F5F5F5] p-4 rounded-md mt-6">
                <h4 className="font-medium text-base mb-2">Further references</h4>
                <div className="flex flex-col gap-3">
                  <a href="https://learn.microsoft.com/en-us/rest/api/azure-ai-services/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <Code className="h-4 w-4" />
                    Azure AI Services REST API Reference
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://learn.microsoft.com/en-us/azure/developer/javascript/how-to/with-azure-services/ai-services" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                    <Code className="h-4 w-4" />
                    Use Azure AI services with JavaScript
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responsible-ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Responsible AI Framework
              </CardTitle>
              <CardDescription>
                Microsoft's approach to ethical and responsible AI
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <h3 className="text-base font-semibold mt-0">Microsoft's Responsible AI Principles</h3>
                  <p>
                    Azure AI Foundry implements Microsoft's six principles for responsible AI development and use:
                  </p>
                  <ul className="space-y-4 mt-4">
                    <li>
                      <strong>Fairness:</strong> AI systems should treat all people fairly and prevent the amplification of bias
                    </li>
                    <li>
                      <strong>Reliability & Safety:</strong> AI systems should perform reliably and safely
                    </li>
                    <li>
                      <strong>Privacy & Security:</strong> AI systems should be secure and respect privacy
                    </li>
                    <li>
                      <strong>Inclusiveness:</strong> AI systems should empower everyone and engage people
                    </li>
                    <li>
                      <strong>Transparency:</strong> AI systems should be understandable
                    </li>
                    <li>
                      <strong>Accountability:</strong> People should be accountable for AI systems
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3 not-prose">
                  <div className="bg-gradient-to-r from-[#0078D4]/5 via-[#8661C5]/5 to-[#E74C84]/5 p-4 rounded-md border border-[#8661C5]/20">
                    <h4 className="font-medium text-base mb-3">Resources</h4>
                    <div className="flex flex-col gap-3">
                      <a href="https://learn.microsoft.com/en-us/azure/ai-studio/concepts/responsible-ai-dashboard" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                        <BookOpen className="h-4 w-4" />
                        Responsible AI dashboard
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a href="https://www.microsoft.com/en-us/ai/responsible-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                        <BookOpen className="h-4 w-4" />
                        Microsoft Responsible AI resources
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a href="https://learn.microsoft.com/en-us/azure/machine-learning/concept-responsible-ai?view=azureml-api-2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                        <BookOpen className="h-4 w-4" />
                        Responsible AI in Azure ML
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a href="https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                        <BookOpen className="h-4 w-4" />
                        Azure OpenAI data & privacy
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-base font-semibold mt-6">Responsible AI in financial services</h3>
              <p>
                Financial services are highly regulated and require extra care in AI implementation. 
                Here's how Azure AI Foundry helps meet these requirements:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#F5F5F5] p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Bias Detection & Mitigation</h4>
                  <p className="text-sm text-muted-foreground">
                    Identifies potential biases in loan decisions based on protected attributes and provides 
                    tools to mitigate these biases.
                  </p>
                </div>
                <div className="bg-[#F5F5F5] p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Model Transparency</h4>
                  <p className="text-sm text-muted-foreground">
                    Delivers clear explanations for loan approval decisions, helping meet regulatory 
                    requirements for model explainability.
                  </p>
                </div>
                <div className="bg-[#F5F5F5] p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Compliance Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Generates documentation to help demonstrate compliance with regulations like 
                    the Fair Housing Act and Equal Credit Opportunity Act.
                  </p>
                </div>
                <div className="bg-[#F5F5F5] p-4 rounded-md">
                  <h4 className="font-medium text-sm mb-2">Ongoing Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Provides tools for continuous monitoring of model performance and fairness 
                    metrics across different demographic groups.
                  </p>
                </div>
              </div>
              
              <div className="not-prose mt-6">
                <div className="flex items-start p-4 bg-[#0078D4]/5 rounded-md">
                  <Video className="h-5 w-5 text-[#0078D4] mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-base mb-1">Recommended training</h4>
                    <p className="text-sm mb-3">Learn more about responsible AI with these resources:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <a href="https://learn.microsoft.com/en-us/training/modules/responsible-ai-principles/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                        <Badge variant="outline" className="h-5">MS Learn</Badge>
                        Responsible AI Principles
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <a href="https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#8661C5] hover:underline">
                        <Badge variant="outline" className="h-5">MS Learn</Badge>
                        AI Fundamentals
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-base font-semibold mt-6">Fairness in loan evaluation</h3>
              <p>
                Azure AI Foundry's ethical loan evaluation capabilities specifically address fairness 
                challenges in financial decision-making:
              </p>
              
              <ul>
                <li>Focus on financial behavior rather than demographic attributes</li>
                <li>Assessment of ability to repay based on objective criteria</li>
                <li>Side-by-side comparison of traditional vs. ethical evaluations</li>
                <li>Detailed factor analysis to identify sources of potential bias</li>
                <li>Customizable bias detection sensitivity for different environments</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}