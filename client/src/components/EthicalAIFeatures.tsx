import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EthicalAIFeatures() {
  const features = [
    {
      icon: "balance",
      title: "Fairness in Lending",
      description: "AI-powered evaluation that significantly reduces bias in lending decisions"
    },
    {
      icon: "visibility",
      title: "Transparent Decisions",
      description: "Clear explanation of evaluation factors with ethical considerations"
    },
    {
      icon: "gavel",
      title: "Regulatory Compliance",
      description: "Meets financial regulations while improving equity and access"
    },
    {
      icon: "analytics",
      title: "Advanced Analytics",
      description: "Comparative analysis between traditional and ethical evaluation methods"
    },
    {
      icon: "security",
      title: "Ethical Guardrails",
      description: "Built-in protections against demographic and socioeconomic bias"
    },
    {
      icon: "assignment_turned_in",
      title: "Documentation",
      description: "Comprehensive audit trail for all loan decisions"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
          Azure AI Foundry Ethical Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="p-4 border border-[#EAEAEA] rounded-md hover:shadow-sm transition-shadow">
              <div className="flex items-start">
                <span className="material-icons text-[#8661C5] mr-3">{feature.icon}</span>
                <div>
                  <h4 className="font-medium text-[#424242] mb-1">{feature.title}</h4>
                  <p className="text-sm text-[#757575]">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
