import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Menu from './pages/Menu';
import About from './pages/About';
import QrCodeScanner from "./pages/QrCodeScanner.tsx";
import Messenger from "./pages/Messenger.tsx";
import Rewards from "./pages/Rewards.tsx";
import Profile from "./pages/Profile.tsx";
import Comunity from "./pages/Comunity.tsx";
import Scheduling from "./pages/Scheduling.tsx";
import Setting from "./pages/Settings.tsx";
import Statistic from "./pages/Statistic.tsx";

import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/qr-scanner" element={<QrCodeScanner />} />
            <Route path="/messenger" element={<Messenger />} /> 
            <Route path="/rewards" element={<Rewards />} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/comunities" element={<Comunity />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/statistic" element={<Statistic />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;