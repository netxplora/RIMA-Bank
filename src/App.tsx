import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import KYCQueue from "@/components/admin/KYCQueue";
import ContentEditor from "@/components/admin/ContentEditor";
import UserTransactions from "@/pages/user/UserTransactions";
import UserTransfers from "@/pages/user/UserTransfers";
import UserCards from "@/pages/user/UserCards";
import UserLoans from "@/pages/user/UserLoans";
import UserSettings from "@/pages/user/UserSettings";
import UserManagement from "@/components/admin/UserManagement";
import LoanOperations from "@/components/admin/LoanOperations";
import AuditLog from "@/components/admin/AuditLog";
import AdminSettings from "@/components/admin/AdminSettings";
import TransactionMonitor from "@/components/admin/TransactionMonitor";
import ProductManagement from "@/components/admin/ProductManagement";
import TicketManagement from "@/components/admin/TicketManagement";
import AdministrativeAnalytics from "@/components/admin/AdministrativeAnalytics";
import SystemHealth from "@/components/admin/SystemHealth";
import AdminProvisioning from "@/components/admin/AdminProvisioning";
import FraudAnalysis from "@/components/admin/FraudAnalysis";
import AgentNetwork from "@/components/admin/AgentNetwork";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSetup from "./pages/admin/AdminSetup";
import OpenAccount from "./pages/OpenAccount";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Products from "./pages/Products";
import DigitalBanking from "./pages/DigitalBanking";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import Branches from "./pages/Branches";
import WhistleBlowing from "./pages/WhistleBlowing";
import Downloads from "./pages/Downloads";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route path="/open-account" element={<OpenAccount />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:type" element={<Products />} />
            <Route path="/digital-banking" element={<DigitalBanking />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/whistle-blowing" element={<WhistleBlowing />} />
            <Route path="/downloads" element={<Downloads />} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/cookies" element={<Legal />} />
            <Route path="/complaints" element={<Legal />} />

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />}>
                <Route path="transactions" element={<UserTransactions />} />
                <Route path="transfers" element={<UserTransfers />} />
                <Route path="cards" element={<UserCards />} />
                <Route path="loans" element={<UserLoans />} />
                <Route path="settings" element={<UserSettings />} />
              </Route>
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute requiredRole={["admin", "super_admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />}>
                <Route path="kyc" element={<KYCQueue />} />
                <Route path="content" element={<ContentEditor />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="loans" element={<LoanOperations />} />
                <Route path="transactions" element={<TransactionMonitor />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="tickets" element={<TicketManagement />} />
                <Route path="analytics" element={<AdministrativeAnalytics />} />
                <Route path="provisioning" element={<AdminProvisioning />} />
                <Route path="fraud" element={<FraudAnalysis />} />
                <Route path="agents" element={<AgentNetwork />} />
                <Route path="health" element={<SystemHealth />} />
                <Route path="audit" element={<AuditLog />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
