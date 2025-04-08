import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Cloud, Link2, CheckCircle2, AlertCircle, Lock, Shield, DownloadCloud, Upload } from "lucide-react";

export default function AzureIntegrations() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Azure Integrations</h1>
        <Button className="gap-2">
          <Cloud className="h-4 w-4" />
          Connect New Service
        </Button>
      </div>

      <Tabs defaultValue="services">
        <TabsList className="mb-4">
          <TabsTrigger value="services">Connected Services</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <IntegrationCard
              title="Azure OpenAI Service"
              description="Connected to East US 2 endpoint"
              status="connected"
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              lastSync="10 minutes ago"
            />
            
            <IntegrationCard
              title="Azure Cognitive Services"
              description="Form recognizer and text analytics"
              status="connected"
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              lastSync="2 hours ago"
            />
            
            <IntegrationCard
              title="Azure Machine Learning"
              description="Custom model deployment"
              status="warning"
              icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
              lastSync="Failed 30 minutes ago"
            />
            
            <IntegrationCard
              title="Azure Cosmos DB"
              description="NoSQL database for app data"
              status="connected"
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              lastSync="1 hour ago"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Integration Settings
              </CardTitle>
              <CardDescription>
                Configure how the application connects to Azure services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto-sync integrations</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync data from connected services</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Failover configuration</Label>
                    <p className="text-sm text-muted-foreground">Use backup services when primary is unavailable</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Verbose logging</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed integration logs</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Connected Data Sources
              </CardTitle>
              <CardDescription>
                Manage your Azure data sources for loan evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <DataSourceItem
                  name="Financial Records Database"
                  type="Azure SQL Database"
                  status="active"
                  lastSync="15 minutes ago"
                />
                
                <DataSourceItem
                  name="Credit History API"
                  type="Azure API Management"
                  status="active"
                  lastSync="30 minutes ago"
                />
                
                <DataSourceItem
                  name="Customer Demographics"
                  type="Azure Blob Storage"
                  status="active"
                  lastSync="1 hour ago"
                />
                
                <DataSourceItem
                  name="Risk Assessment Models"
                  type="Azure Machine Learning"
                  status="inactive"
                  lastSync="Connection failed"
                />
              </div>
              
              <div className="mt-6 flex gap-2 justify-end">
                <Button variant="outline" className="gap-2">
                  <DownloadCloud className="h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Export
                </Button>
                <Button className="gap-2">
                  <Link2 className="h-4 w-4" />
                  Connect New
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Authentication Settings
              </CardTitle>
              <CardDescription>
                Manage security credentials for Azure services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant">Azure AD Tenant ID</Label>
                  <Input id="tenant" defaultValue="********-****-****-****-************" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-id">Client ID</Label>
                  <Input id="client-id" defaultValue="********-****-****-****-************" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-secret">Client Secret</Label>
                  <div className="flex gap-2">
                    <Input id="client-secret" type="password" defaultValue="••••••••••••••••••••••" />
                    <Button variant="outline" size="icon">
                      <Lock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-muted p-4 flex gap-3">
                <Shield className="h-5 w-5 text-[#8661C5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Secure Connection</h4>
                  <p className="text-sm text-muted-foreground">
                    Your connection to Azure services is protected with enterprise-grade security. 
                    Authentication is handled via Microsoft Entra ID (Azure AD) with role-based access controls.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
interface IntegrationCardProps {
  title: string;
  description: string;
  status: "connected" | "disconnected" | "warning";
  icon: React.ReactNode;
  lastSync: string;
}

function IntegrationCard({ title, description, status, icon, lastSync }: IntegrationCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{title}</h3>
              <Badge variant={status === "connected" ? "default" : "outline"} className={status === "connected" ? "bg-[#8661C5]" : ""}>
                {status === "connected" ? "Connected" : status === "warning" ? "Warning" : "Disconnected"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {icon}
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-xs text-muted-foreground">Last sync: {lastSync}</span>
          <Button variant="ghost" size="sm" className="text-[#8661C5]">Configure</Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface DataSourceItemProps {
  name: string;
  type: string;
  status: "active" | "inactive";
  lastSync: string;
}

function DataSourceItem({ name, type, status, lastSync }: DataSourceItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex gap-3 items-center">
        <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-500" : "bg-gray-300"}`}></div>
        <div>
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">{lastSync}</span>
        <Button variant="ghost" size="sm" className="text-[#8661C5]">
          Manage
        </Button>
      </div>
    </div>
  );
}