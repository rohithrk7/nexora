import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

// Layout
import MainLayout from "@/components/layouts/MainLayout";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import EventsPage from "@/pages/events/EventsPage";
import EventDetailPage from "@/pages/events/EventDetailPage";
import CreateEventPage from "@/pages/events/CreateEventPage";
import VerifyCertificatePage from "@/pages/certificates/VerifyCertificatePage";
import MyCertificatesPage from "@/pages/certificates/MyCertificatesPage";
import CommunityPage from "@/pages/community/CommunityPage";
import MarketplacePage from "@/pages/marketplace/MarketplacePage";
import ProfilePage from "@/pages/profile/ProfilePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/new" element={<CreateEventPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/verify/:id" element={<VerifyCertificatePage />} />
              <Route path="/certificates" element={<MyCertificatesPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Catch-all */}
              <Route path="*" element={<div className="container mx-auto py-20 text-center"><h1>404 Not Found</h1></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
