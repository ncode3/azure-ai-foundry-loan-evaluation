import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EthicalAIFeatures() {
  const features = [
    {
      icon: "security",
      title: "Built-in Guardrails",
      description: "Ethical constraints that enhance business value by expanding addressable market"
    },
    {
      icon: "gavel",
      title: "Regulatory Compliance",
      description: "Turn compliance requirements into competitive advantages"
    },
    {
      icon: "hub",
      title: "Integration Ready",
      description: "Connect to existing banking systems through APIs"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#424242]">Azure AI Foundry Ethical Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="p-4 border border-[#E0E0E0] rounded-md">
              <div className="flex items-start">
                <span className="material-icons text-[#0078D4] mr-3">{feature.icon}</span>
                <div>
                  <h4 className="font-medium text-[#424242] mb-1">{feature.title}</h4>
                  <p className="text-sm text-[#9E9E9E]">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
