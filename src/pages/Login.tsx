import { useState } from "react";
import { Eye, EyeOff, Facebook, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/menu");
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#1a1f2e]" : "bg-background"}`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-fade-in ${isDark ? "bg-[#2a2f3d]" : "bg-white"}`}>
          <div className="flex flex-col items-center mb-8">
            <img
              src="/logo-wellmize.svg"
              alt="Wellmize Logo"
              className="w-12 h-12 mb-2"
            />
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Fazer login</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                E-mail
              </label>
              <Input
                type="email"
                id="email"
                placeholder="seu@email.com"
                className={`w-full px-3 py-2 border ${isDark ? "border-gray-600" : "border-gray-300"} rounded-md focus:ring-[#00B4D8] focus:border-[#00B4D8]`}
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Senha
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 border ${isDark ? "border-gray-600" : "border-gray-300"} rounded-md focus:ring-[#00B4D8] focus:border-[#00B4D8]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full bg-[#00B4D8] hover:bg-[#00a0c2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2`}
            >
              Fazer Login
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              {/* Barra lateral esquerda */}
              <div className={`w-1/3 border-t ${isDark ? "border-gray-600" : "border-gray-300"}`}></div>
              {/* Texto "Ou continue com" */}
              <div className="mx-2 text-sm text-gray-500 whitespace-nowrap">
                Ou continue com
              </div>
              {/* Barra lateral direita */}
              <div className={`w-1/3 border-t ${isDark ? "border-gray-600" : "border-gray-300"}`}></div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className={`w-full flex items-center justify-center py-2 px-4 border ${isDark ? "border-gray-600" : "border-gray-300"} rounded-md shadow-sm bg-white text-sm font-medium text-[#00B4D8] hover:bg-gray-50`}
              >
                <Mail className="h-5 w-5 transition-colors duration-200 text-gray-400 hover:text-[#00B4D8]" />
              </Button>
              <Button
                variant="outline"
                className={`w-full flex items-center justify-center py-2 px-4 border ${isDark ? "border-gray-600" : "border-gray-300"} rounded-md shadow-sm bg-white text-sm font-medium text-[#00B4D8] hover:bg-gray-50`}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className={`w-full flex items-center justify-center py-2 px-4 border ${isDark ? "border-gray-600" : "border-gray-300"} rounded-md shadow-sm bg-white text-sm font-medium text-[#00B4D8] hover:bg-gray-50`}
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="#" className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-[#00B4D8]"} hover:text-[#00a0c2]`}>
              Esqueceu sua senha?
            </a>
          </div>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Não tem uma conta?{" "}
              <a href="#" className={`font-medium ${isDark ? "text-[#00B4D8]" : "text-[#00B4D8]"} hover:text-[#00a0c2]`}>
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
