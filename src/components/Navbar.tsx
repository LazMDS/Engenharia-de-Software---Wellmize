import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext"; // Importe o hook de tema

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Usando o hook de tema

  const isDark = theme === "dark"; // Verificando o tema atual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img 
              src="/logo-wellmize.svg" 
              alt="Wellmize Logo" 
              className="w-8 h-8 text-primary"
            />
            <span className="text-xl font-bold text-gray-900 ml-2">Wellmize</span>
          </div>

          {/* Aqui vai a parte do menu para versão desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/about")}>Sobre</Button>
            <Button 
              className="bg-primary text-white hover:bg-primary-hover"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
            
            {/* Botão de troca de tema na versão desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:bg-gray-100"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </Button>
          </div>

          {/* Botão de menu hamburguer e tema na versão mobile */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Botão de troca de tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:bg-gray-100"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </Button>

            {/* Botão de menu hamburguer */}
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
          <div className="px-4 py-2 space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                navigate("/about");
                setIsMenuOpen(false);
              }}
            >
              Sobre
            </Button>
            <Button 
              className="w-full bg-primary text-white hover:bg-primary-hover"
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
            >
              Entrar
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
