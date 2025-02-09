import React, { useState } from "react";
import { ArrowRight, QrCode, Users, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLoginClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#1a1f2e]" : "bg-background"}`}>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <Navbar />
      
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isLoading ? 'page-transition' : ''}`}>
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-8">
            <img 
              src="/logo-wellmize.svg" 
              alt="Wellmize Logo" 
              className="h-28 w-28"
            />
          </div>
          <h1 className={`text-4xl font-bold ${isDark ? "text-white" : "text-foreground"} sm:text-5xl md:text-6xl mb-4`}>
            Bem-vindo a <span className="gradient-text font-extrabold">Wellmize</span>
          </h1>
          <p className={`text-xl ${isDark ? "text-gray-300" : "text-foreground/70"} max-w-2xl mx-auto mb-8`}>
            A maneira inteligente de gerenciar sua experiência na academia. Check-ins rápidos, monitoramento de ocupação em tempo real e comunicação simplificada.
          </p>
          <Button 
            className={`bg-primary text-white hover:bg-primary-hover ${isDark ? "hover:bg-primary-dark" : ""}`}     
            onClick={handleLoginClick}
          >
            Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className={`bg-muted p-6 rounded-lg hover:bg-muted/80 transition-colors ${isDark ? "bg-[#2a2f3d]" : ""}`}>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-foreground"} mb-2`}>Check-in Simplificado</h3>
            <p className={`text-foreground/70 ${isDark ? "text-gray-300" : ""}`}>
              Acesso rápido e fácil com QR Code, eliminando filas e custos com catracas.
            </p>
          </div>

          <div className={`bg-muted p-6 rounded-lg hover:bg-muted/80 transition-colors ${isDark ? "bg-[#2a2f3d]" : ""}`}>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-foreground"} mb-2`}>Monitoramento em Tempo Real</h3>
            <p className={`text-foreground/70 ${isDark ? "text-gray-300" : ""}`}>
              Acompanhe a ocupação da academia e o fluxo de alunos instantaneamente.
            </p>
          </div>

          <div className={`bg-muted p-6 rounded-lg hover:bg-muted/80 transition-colors ${isDark ? "bg-[#2a2f3d]" : ""}`}>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-foreground"} mb-2`}>Engajamento Inteligente</h3>
            <p className={`text-foreground/70 ${isDark ? "text-gray-300" : ""}`}>
              Notificações personalizadas e gamificação para motivar seus alunos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
