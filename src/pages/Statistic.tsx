import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  Dumbbell,
  Calendar,
  Trophy,
  Target,
  Instagram,
  TrendingUp,
  MessageCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MOCK_PEAK_HOURS = [
  { hour: "06:00", capacity: 45 },
  { hour: "07:00", capacity: 65 },
  { hour: "08:00", capacity: 85 },
  { hour: "09:00", capacity: 55 },
  { hour: "17:00", capacity: 95 },
  { hour: "18:00", capacity: 100 },
  { hour: "19:00", capacity: 90 },
];

const MOCK_EQUIPMENT = [
  { name: "Esteira", available: 3, total: 5 },
  { name: "Supino", available: 4, total: 4 },
  { name: "Leg Press", available: 1, total: 2 },
  { name: "Bicicleta", available: 5, total: 6 },
];

const MOCK_ACCESS_HISTORY = [
  { date: "2024-03-10", time: "07:00", duration: "1h 30min" },
  { date: "2024-03-09", time: "18:30", duration: "1h" },
  { date: "2024-03-07", time: "07:00", duration: "1h 15min" },
  { date: "2024-03-06", time: "19:00", duration: "45min" },
];

const MOCK_COMPETITIONS = [
  {
    title: "Desafio de Março",
    description: "Quem treinar mais dias consecutivos",
    progress: 70,
    position: 3,
    totalParticipants: 45,
  },
  {
    title: "Meta Coletiva",
    description: "1000km na esteira",
    progress: 85,
    position: 1,
    totalParticipants: 30,
  },
];

function Statistic() {
  const [currentTab, setCurrentTab] = useState("realTime");
  const [points] = useState(850);
  const [streak] = useState(4);
  const [level] = useState("Prata");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getCapacityColor = (capacity) => {
    if (capacity >= 80) return darkMode ? "bg-red-500" : "bg-red-600";
    if (capacity >= 50) return darkMode ? "bg-yellow-400" : "bg-yellow-500";
    return darkMode ? "bg-green-400" : "bg-green-500";
  };

  const getCapacityText = (capacity) => {
    if (capacity >= 80) return "Lotado";
    if (capacity >= 50) return "Moderado";
    return "Tranquilo";
  };

  const renderTab = () => {
    switch (currentTab) {
      case "realTime":
        return (
          <div className="space-y-6">
            {/* Current Capacity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                <Users className="w-5 h-5 mr-2" />
                Ocupação Atual
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="dark:text-gray-200">65 pessoas</span>
                <span className="text-yellow-500 dark:text-yellow-400">
                  65% da capacidade
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 dark:bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            {/* Equipment Availability */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                <Dumbbell className="w-5 h-5 mr-2" />
                Disponibilidade de Aparelhos
              </h3>
              <div className="space-y-3">
                {MOCK_EQUIPMENT.map((equipment) => (
                  <div
                    key={equipment.name}
                    className="flex items-center justify-between"
                  >
                    <span className="dark:text-gray-200">{equipment.name}</span>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          equipment.available === equipment.total
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : equipment.available === 0
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {equipment.available}/{equipment.total} disponíveis
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horários de Pico */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                <Clock className="w-5 h-5 mr-2" />
                Horários de Pico
              </h3>
              <div className="space-y-3">
                {MOCK_PEAK_HOURS.map((hour) => (
                  <div
                    key={hour.hour}
                    className="flex items-center justify-between"
                  >
                    <span className="dark:text-gray-200">{hour.hour}</span>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${getCapacityColor(
                          hour.capacity
                        )} mr-2`}
                      ></div>
                      <span className="dark:text-gray-200">
                        {getCapacityText(hour.capacity)}
                      </span>
                      <span className="text-sm ml-2 dark:text-gray-400">
                        ({hour.capacity}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "history":
        return (
          <div className="space-y-6">
            {/* Historico */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Histórico de Acessos
              </h3>
              <div className="space-y-4">
                {MOCK_ACCESS_HISTORY.map((access, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b dark:border-gray-700 pb-2"
                  >
                    <div>
                      <p className="font-semibold dark:text-gray-200">
                        {new Date(access.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {access.time}
                      </p>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400">
                      {access.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-white">
                <TrendingUp className="w-5 h-5 mr-2" />
                Estatísticas Semanais
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {streak}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dias Seguidos
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {points}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Pontos
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {level}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nível
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Header */}
      <nav
        className={`fixed top-0 w-full ${
          darkMode ? "bg-[#1e2538]" : "bg-white"
        } shadow-md z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/menu")}
            >
              <Calendar className="w-6 h-6 text-blue-500" />
              <span
                className={`ml-2 text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Agendamentos
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode ? "hover:bg-[#252b3b]" : "hover:bg-gray-100"
                }`}
              >
                {darkMode ? (
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

      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <nav className="flex divide-x divide-gray-200 dark:divide-gray-700">
            <button
              onClick={() => setCurrentTab("realTime")}
              className={`flex-1 py-4 px-4 text-center ${
                currentTab === "realTime"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Tempo Real
            </button>
            <button
              onClick={() => setCurrentTab("history")}
              className={`flex-1 py-4 px-4 text-center ${
                currentTab === "history"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Histórico
            </button>
          </nav>
        </div>

        {/* Content */}
        {renderTab()}
      </main>
    </div>
  );
}

export default Statistic;
