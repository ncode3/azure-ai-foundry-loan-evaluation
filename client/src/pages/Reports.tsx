import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileBarChart, FileSpreadsheet, Download, Filter, SlidersHorizontal, Calendar, Printer } from "lucide-react";
import { useState } from "react";

const monthlyData = [
  { name: 'Jan', traditional: 65, ethical: 80 },
  { name: 'Feb', traditional: 59, ethical: 72 },
  { name: 'Mar', traditional: 80, ethical: 85 },
  { name: 'Apr', traditional: 81, ethical: 83 },
  { name: 'May', traditional: 56, ethical: 74 },
  { name: 'Jun', traditional: 55, ethical: 75 },
  { name: 'Jul', traditional: 40, ethical: 68 },
  { name: 'Aug', traditional: 45, ethical: 70 },
  { name: 'Sep', traditional: 60, ethical: 79 },
  { name: 'Oct', traditional: 70, ethical: 82 },
  { name: 'Nov', traditional: 65, ethical: 81 },
  { name: 'Dec', traditional: 68, ethical: 80 },
];

const biasFactorsData = [
  { name: 'Gender', value: 32 },
  { name: 'Age', value: 18 },
  { name: 'Location', value: 25 },
  { name: 'Income Source', value: 15 },
  { name: 'Education', value: 10 },
];

const BIAS_COLORS = ['#0078D4', '#8661C5', '#E74C84', '#00B294', '#FFB900'];

const comparisonData = [
  { name: 'Low Income', traditional: 45, ethical: 68 },
  { name: 'Medium Income', traditional: 60, ethical: 70 },
  { name: 'High Income', traditional: 80, ethical: 82 },
];

const approvalTrendData = [
  { month: 'Jan', approvalRate: 68 },
  { month: 'Feb', approvalRate: 70 },
  { month: 'Mar', approvalRate: 72 },
  { month: 'Apr', approvalRate: 75 },
  { month: 'May', approvalRate: 78 },
  { month: 'Jun', approvalRate: 80 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState('last-90-days');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="gap-2">
            <FileBarChart className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="year-to-date">Year to date</SelectItem>
              <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-[#8661C5] rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Ethical AI</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-[#0078D4] rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Traditional</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bias-metrics">Bias Metrics</TabsTrigger>
          <TabsTrigger value="approval-rates">Approval Rates</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <MetricCard 
              title="Total Applications"
              value="1,248"
              change="+12.5%"
              trend="up"
            />
            <MetricCard 
              title="Approval Rate"
              value="78.3%"
              change="+8.2%"
              trend="up"
            />
            <MetricCard 
              title="Bias Reduction"
              value="65.4%"
              change="+15.3%"
              trend="up"
            />
            <MetricCard 
              title="Average Processing Time"
              value="1.8s"
              change="-23.5%"
              trend="down"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                Monthly Comparison: Ethical vs Traditional Approvals
              </CardTitle>
              <CardDescription>
                Comparing approval rates between traditional evaluation and Azure AI Foundry ethical evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="traditional" fill="#0078D4" name="Traditional" />
                    <Bar dataKey="ethical" fill="#8661C5" name="Ethical AI" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex justify-between w-full text-sm text-muted-foreground">
                <span>Source: Azure AI Foundry Analytics</span>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download data
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                  Bias Factors Distribution
                </CardTitle>
                <CardDescription>
                  Sources of bias identified in traditional evaluation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={biasFactorsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {biasFactorsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={BIAS_COLORS[index % BIAS_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#0078D4] via-[#8661C5] to-[#E74C84] mr-3 rounded-full"></div>
                  Approval Rate Trend
                </CardTitle>
                <CardDescription>
                  Ethical evaluation approval rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={approvalTrendData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="approvalRate" 
                        stroke="#8661C5" 
                        name="Approval Rate (%)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bias-metrics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Bias Metrics</CardTitle>
              <CardDescription>
                This section would contain detailed bias analysis metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/10">
                <div className="text-center space-y-2">
                  <SlidersHorizontal className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-medium">Advanced Bias Metrics</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    This section would contain detailed bias analysis charts and metrics 
                    to help identify and reduce bias in lending decisions.
                  </p>
                  <Button className="mt-2">Configure Metrics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approval-rates">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Approval Rate Analysis</CardTitle>
              <CardDescription>
                This section would contain detailed approval rate analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/10">
                <div className="text-center space-y-2">
                  <SlidersHorizontal className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-medium">Approval Rate Analysis</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    This section would contain detailed charts and analysis on approval rates
                    across different demographic groups and time periods.
                  </p>
                  <Button className="mt-2">Explore Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Demographic Analysis</CardTitle>
              <CardDescription>
                This section would contain detailed demographic analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] border rounded-md bg-muted/10">
                <div className="text-center space-y-2">
                  <SlidersHorizontal className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-medium">Demographic Analysis</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    This section would contain detailed analysis on how different 
                    demographic groups are evaluated by the AI system.
                  </p>
                  <Button className="mt-2">View Demographics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex justify-between items-baseline">
            <h3 className="text-2xl font-bold">{value}</h3>
            <Badge 
              variant="outline" 
              className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} font-normal`}
            >
              {change}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}