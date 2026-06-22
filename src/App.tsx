import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import PartyFinder from "./pages/PartyFinder";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import RevenueTracker from "./pages/RevenueTracker";
import PitchDeck from "./pages/PitchDeck";
import ShopMyPitch from "./pages/ShopMyPitch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/revenuetracker" element={<RevenueTracker />} />
            <Route path="/pitchdeck" element={<PitchDeck />} />
            <Route path="/shopmypitch" element={<ShopMyPitch />} />
            <Route path="/tennis" element={<Index />} />
            <Route path="/tennis/event/:id" element={<EventDetail />} />
            <Route path="/tennis/create" element={<CreateEvent />} />
            <Route path="/tennis/auth" element={<Auth />} />
            <Route path="/tennis/account" element={<Account />} />
            <Route path="/tennis/profile/:id" element={<Profile />} />
            <Route path="/tennis/messages" element={<Messages />} />
            <Route path="/tennis/find" element={<PartyFinder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
