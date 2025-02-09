import React from "react";
import {
  BarChart2,
  Calendar,
  MessageSquare,
  QrCode,
  Settings,
  Trophy,
  User,
  Users,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const userName = "João Silva";
  const checkInStatus = "active";
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const navigate = useNavigate();

  const handleQrCodeClick = () => {
    navigate("/qr-scanner");
  };

  const handleMessenger = () => {
    navigate("/messenger");
  };

  const handleRewards = () => {
    navigate("/rewards");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleComunity = () => {
    navigate("/comunities");
  };

  const handleScheduling = () => {
    navigate("/scheduling");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleStatistic = () => {
    navigate("/statistic");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#1a1f2e] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Top Navigation */}
      <nav
        className={`fixed top-0 w-full shadow-lg z-50 transition-colors duration-300 ${
          isDark ? "bg-[#1e2538]" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img
                src="/logo-wellmize.svg"
                alt="Wellmize Logo"
                className="w-8 h-8"
              />
              <span
                className={`ml-2 text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Wellmize
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDark ? "hover:bg-[#252b3b]" : "hover:bg-gray-100"
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {/* Status Card */}
          <div
            className={`p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.01] ${
              isDark ? "bg-[#1e2538]" : "bg-white"
            } animate-slide-in-left`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Bem-vindo, {userName}</h2>
                <p
                  className={
                    checkInStatus === "active"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }
                >
                  {checkInStatus === "active"
                    ? " Usuário ativo"
                    : "⏳ Aguardando entrada"}
                </p>
              </div>
              <div className="text-right">
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Última atividade
                </p>
                <p className="font-semibold">Hoje, 15:30</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: <QrCode className="w-6 h-6" />,
                label: "QR Code",
                onClick: handleQrCodeClick,
              },
              { icon: <Calendar className="w-6 h-6" />, label: "Agendar", onClick: handleScheduling, },
              {
                icon: <BarChart2 className="w-6 h-6" />,
                label: "Estatísticas",
                onClick: handleStatistic,
              },
              {
                icon: <Settings className="w-6 h-6" />, 
                label: "Configurações",
                onClick: handleSettings,
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                label: "Mensagens",
                onClick: handleMessenger,
              },
              {
                icon: <Trophy className="w-6 h-6" />,
                label: "Recompensas",
                onClick: handleRewards,
              },
              {
                icon: <User className="w-6 h-6" />,
                label: "Perfil",
                onClick: handleProfile,
              },
              { icon: <Users className="w-6 h-6" />, label: "Comunidade", onClick: handleComunity,}, 
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`p-4 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 ${
                  isDark
                    ? "bg-[#1e2538] hover:bg-[#252b3b]"
                    : "bg-white hover:bg-gray-50"
                } animate-scale-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={isDark ? "text-blue-500" : "text-[#00B4D8]"}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Activity Overview */}
          <div
            className={`mt-8 p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.01] ${
              isDark ? "bg-[#1e2538]" : "bg-white"
            } animate-slide-in-right`}
          >
            <h3 className="text-xl font-bold mb-4">Visão Geral da Atividade</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  isDark ? "bg-[#252b3b]" : "bg-gray-50"
                }`}
              >
                <p
                  className={
                    isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"
                  }
                >
                  Frequência Semanal
                </p>
                <p className="text-2xl font-bold">4/5</p>
                <p className="text-sm text-green-500">+2% vs. última semana</p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  isDark ? "bg-[#252b3b]" : "bg-gray-50"
                }`}
              >
                <p
                  className={
                    isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"
                  }
                >
                  Pontos Acumulados
                </p>
                <p className="text-2xl font-bold">850</p>
                <p
                  className={
                    isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"
                  }
                >
                  Nível Prata
                </p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  isDark ? "bg-[#252b3b]" : "bg-gray-50"
                }`}
              >
                <p
                  className={
                    isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"
                  }
                >
                  Próximo Treino
                </p>
                <p className="text-2xl font-bold">Hoje, 18:00</p>
                <p
                  className={
                    isDark ? "text-sm text-blue-500" : "text-sm text-[#00B4D8]"
                  }
                >
                  Treino de Força
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
