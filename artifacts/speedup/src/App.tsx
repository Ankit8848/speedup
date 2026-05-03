import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HowItWorksPage from "@/pages/HowItWorksPage";
import TechnologyPage from "@/pages/TechnologyPage";
import SafetyPage from "@/pages/SafetyPage";
import LocationsPage from "@/pages/LocationsPage";
import ForBusinessPage from "@/pages/ForBusinessPage";
import PricingPage from "@/pages/PricingPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/technology" component={TechnologyPage} />
      <Route path="/safety" component={SafetyPage} />
      <Route path="/locations" component={LocationsPage} />
      <Route path="/for-business" component={ForBusinessPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/admin" component={AdminDashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") }>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
