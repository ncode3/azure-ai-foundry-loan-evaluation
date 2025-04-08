import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LoanEvaluation from "@/pages/LoanEvaluation";
import EvaluationHistory from "@/pages/EvaluationHistory";
import AISettings from "@/pages/AISettings";
import AzureIntegrations from "@/pages/AzureIntegrations";
import Reports from "@/pages/Reports";
import Documentation from "@/pages/Documentation";
import Settings from "@/pages/Settings";
import TestPage from "@/pages/TestPage";
import AppHeader from "@/components/AppHeader";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <AppHeader />
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-3 lg:col-span-2">
            <SideNav />
          </div>
          <div className="md:col-span-9 lg:col-span-10 space-y-6">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <LoanEvaluation />
        </Layout>
      </Route>
      <Route path="/evaluation-history">
        <Layout>
          <EvaluationHistory />
        </Layout>
      </Route>
      <Route path="/ai-settings">
        <Layout>
          <AISettings />
        </Layout>
      </Route>
      <Route path="/azure-integrations">
        <Layout>
          <AzureIntegrations />
        </Layout>
      </Route>
      <Route path="/reports">
        <Layout>
          <Reports />
        </Layout>
      </Route>
      <Route path="/documentation">
        <Layout>
          <Documentation />
        </Layout>
      </Route>
      <Route path="/settings">
        <Layout>
          <Settings />
        </Layout>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
