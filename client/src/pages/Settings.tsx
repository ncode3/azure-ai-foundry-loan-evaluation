import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Settings2, Bell, Lock, Database, UserCog, Building, Languages, LogOut, Shield, CreditCard, Save, Info, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("system");
  const [dataRetention, setDataRetention] = useState(30);
  const [saveStatus, setSaveStatus] = useState("");
  
  const handleSave = () => {
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <Button 
          className="gap-2" 
          onClick={handleSave}
          disabled={saveStatus === "saved"}
        >
          {saveStatus === "saved" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Account Information
              </CardTitle>
              <CardDescription>
                Manage your personal account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Azure Administrator" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@contoso.onmicrosoft.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="AI Solutions Architect" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Technology & Innovation" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Secure your account with two-factor authentication</p>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="gap-2">
                      <Settings2 className="h-4 w-4" />
                      Manage 2FA
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Account Deletion</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                API Access
              </CardTitle>
              <CardDescription>
                Manage API keys and application credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-medium">API Keys</h3>
                    <p className="text-sm text-muted-foreground">Manage keys to access the Azure AI Foundry API</p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Lock className="h-4 w-4" />
                    Create New Key
                  </Button>
                </div>
                <div className="border rounded-md">
                  <div className="p-4 border-b flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Development Key</h4>
                      <p className="text-xs text-muted-foreground">Created on April 12, 2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Last used yesterday</Badge>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Production Key</h4>
                      <p className="text-xs text-muted-foreground">Created on March 28, 2024</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Last used 2 hours ago</Badge>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Organization Settings
              </CardTitle>
              <CardDescription>
                Configure organization-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Contoso Financial Services" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-id">Organization ID</Label>
                  <Input id="org-id" defaultValue="contoso-fs-9a72b3" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="finance">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Organization Size</Label>
                  <Select defaultValue="enterprise">
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-10)</SelectItem>
                      <SelectItem value="small">Small (11-50)</SelectItem>
                      <SelectItem value="medium">Medium (51-250)</SelectItem>
                      <SelectItem value="large">Large (251-1000)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Organization Description</Label>
                  <Input id="description" defaultValue="A leading financial services provider specializing in ethical AI-powered loan evaluation and financial products." />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Team Members</h3>
                  <div className="border rounded-md">
                    <div className="p-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0078D4] via-[#8661C5] to-[#E74C84] flex items-center justify-center text-white">
                          <span className="text-sm font-medium">AA</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Azure Administrator</h4>
                          <p className="text-xs text-muted-foreground">admin@contoso.onmicrosoft.com</p>
                        </div>
                      </div>
                      <Badge>Owner</Badge>
                    </div>
                    <div className="p-3 border-b flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0078D4] flex items-center justify-center text-white">
                          <span className="text-sm font-medium">JD</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Jane Doe</h4>
                          <p className="text-xs text-muted-foreground">jane.doe@contoso.onmicrosoft.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Admin</Badge>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8661C5] flex items-center justify-center text-white">
                          <span className="text-sm font-medium">JS</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">John Smith</h4>
                          <p className="text-xs text-muted-foreground">john.smith@contoso.onmicrosoft.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Member</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <UserCog className="h-4 w-4" />
                    Manage Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Azure Resources
              </CardTitle>
              <CardDescription>
                Connected Azure resources and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#F5F5F5] p-4 rounded-md flex items-start gap-3">
                  <Building className="h-5 w-5 text-[#0078D4] mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Connected Azure tenant</h3>
                    <p className="text-sm mb-2">Contoso Financial Services (contoso.onmicrosoft.com)</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-[#0078D4]/10">Azure OpenAI Service</Badge>
                      <Badge variant="outline" className="bg-[#0078D4]/10">Azure Machine Learning</Badge>
                      <Badge variant="outline" className="bg-[#0078D4]/10">Azure Cognitive Services</Badge>
                      <Badge variant="outline" className="bg-[#0078D4]/10">Azure Cosmos DB</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Building className="h-4 w-4" />
                    Manage Azure Resources
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the appearance of your Azure AI Foundry platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-base font-medium">Theme</h3>
                <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System Default</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-base font-medium">Language</h3>
                <Select defaultValue="en-us">
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-us">English (United States)</SelectItem>
                    <SelectItem value="en-gb">English (United Kingdom)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="zh-cn">中文 (简体)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Density</h3>
                    <p className="text-sm text-muted-foreground">Adjust the density of the user interface</p>
                  </div>
                  <div className="flex gap-8 items-center">
                    <span className="text-sm text-muted-foreground">Compact</span>
                    <Slider
                      defaultValue={[1]}
                      max={2}
                      step={1}
                      className="w-[120px]"
                    />
                    <span className="text-sm text-muted-foreground">Comfortable</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">Configure accessibility settings</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion">Reduced motion</Label>
                    <Switch id="reduced-motion" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast">High contrast</Label>
                    <Switch id="high-contrast" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="large-text">Larger text</Label>
                    <Switch id="large-text" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Loan Evaluation Updates</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications when loan evaluations are completed</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">System Updates</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications about system updates and maintenance</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Product Announcements</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications about new features and improvements</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Bell className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Browser Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Data Privacy
              </CardTitle>
              <CardDescription>
                Manage data privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Data Retention</h3>
                      <p className="text-sm text-muted-foreground">Control how long your data is stored</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{dataRetention} days</span>
                    <Slider
                      value={[dataRetention]}
                      min={7}
                      max={365}
                      step={1}
                      onValueChange={(value) => setDataRetention(value[0])}
                      className="w-[150px]"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Enhanced Security</h3>
                      <p className="text-sm text-muted-foreground">Enable additional security features</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-[#8661C5] mt-0.5" />
                    <div>
                      <h3 className="font-medium">Session Timeout</h3>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#0078D4]/5 via-[#8661C5]/5 to-[#E74C84]/5 p-4 rounded-md border border-[#8661C5]/20 mt-6">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-[#8661C5] mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Microsoft Privacy Statement</h4>
                    <p className="text-sm text-[#424242] mb-2">
                      Your privacy is important to us. Please review the Microsoft Privacy Statement to learn how we collect, 
                      use, and protect your personal data.
                    </p>
                    <a 
                      href="https://privacy.microsoft.com/en-us/privacystatement" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#8661C5] hover:underline"
                    >
                      Read the Privacy Statement
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Sign In Methods</h3>
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Password</h4>
                      <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Microsoft Authenticator</h4>
                      <p className="text-xs text-muted-foreground">Enabled</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Security Questions</h4>
                      <p className="text-xs text-muted-foreground">3 questions set</p>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Activity Log</h3>
                    <p className="text-sm text-muted-foreground">View recent account activity</p>
                  </div>
                  <Button variant="outline" size="sm">View Activity</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Billing Information
              </CardTitle>
              <CardDescription>
                Manage your billing details and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#F5F5F5] p-4 rounded-md flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-[#0078D4] mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Current Plan</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">Enterprise Plan</h4>
                    <Badge className="bg-[#8661C5]">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Billed annually at $25,000 per year</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Change Plan</Button>
                    <Button variant="outline" size="sm">View Invoice</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Payment Method</h3>
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#F5F5F5] p-2 rounded">
                      <CreditCard className="h-5 w-5 text-[#424242]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Corporate Card</h4>
                      <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Default</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Billing Address</h3>
                <div className="bg-white border rounded-md p-4">
                  <p className="text-sm">Contoso Financial Services</p>
                  <p className="text-sm">123 Corporate Plaza</p>
                  <p className="text-sm">Redmond, WA 98052</p>
                  <p className="text-sm">United States</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Edit Address</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Usage & Quotas</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">API Calls</span>
                      <span className="text-sm font-medium">8,432 / 10,000</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-[#8661C5] h-full rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Storage</span>
                      <span className="text-sm font-medium">23.4 GB / 50 GB</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-[#0078D4] h-full rounded-full" style={{ width: '47%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Model Deployments</span>
                      <span className="text-sm font-medium">2 / 5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-[#E74C84] h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}