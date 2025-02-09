import React, { useState } from 'react';
import { Trophy, Gift, Target, Share2, Moon, Sun, Medal, Coins } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
  image: string;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  points: number;
  avatar: string;
}

const mockRewards: Reward[] = [
  {
    id: 1,
    name: "Desconto na Mensalidade",
    points: 1000,
    description: "15% de desconto na próxima mensalidade",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Sessão Personal",
    points: 750,
    description: "1 sessão gratuita com personal trainer",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Kit Academia",
    points: 500,
    description: "Kit com squeeze e toalha personalizada",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop"
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 1,
    name: "Maria Silva",
    points: 2500,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Pedro Santos",
    points: 2350,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Ana Oliveira",
    points: 2200,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
];

const mockUserStats = {
  currentPoints: 850,
  monthlyGoal: 1000,
  progress: 85,
  rank: 5,
  totalUsers: 120
};

function Rewards() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'rewards' | 'leaderboard' | 'goals'>('rewards');

  const handleShare = () => {
    //caixa de diálogo de compartilhamento
    console.log('Sharing achievements...');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <nav className={`fixed top-0 w-full ${isDark ? 'bg-[#1e2538]' : 'bg-white'} shadow-md z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/menu")}> 
                    <Trophy className="w-6 h-6 text-blue-500" />
                    <span className={`ml-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recompensas</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${isDark ? "hover:bg-[#252b3b]" : "hover:bg-gray-100"}`}
                    >
                        {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                    </button>
                    <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <button
                    onClick={handleShare}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                    <Share2 className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Points Overview */}
        <div className={`p-6 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{mockUserStats.currentPoints}</h2>
              <p className="text-sm text-gray-500">Pontos Disponíveis</p>
            </div>
            <Coins className="w-12 h-12 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Meta Mensal</span>
              <span>{mockUserStats.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${mockUserStats.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <TabButton
            active={selectedTab === 'rewards'}
            onClick={() => setSelectedTab('rewards')}
            icon={<Gift className="w-4 h-4" />}
            label="Recompensas"
          />
          <TabButton
            active={selectedTab === 'leaderboard'}
            onClick={() => setSelectedTab('leaderboard')}
            icon={<Trophy className="w-4 h-4" />}
            label="Ranking"
          />
          <TabButton
            active={selectedTab === 'goals'}
            onClick={() => setSelectedTab('goals')}
            icon={<Target className="w-4 h-4" />}
            label="Metas"
          />
        </div>

        {/* Tab Content */}
        {selectedTab === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRewards.map((reward) => (
              <div
                key={reward.id}
                className={`${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]`}
              >
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{reward.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{reward.points} pontos</span>
                    <button
                      className={`px-4 py-2 rounded-full ${
                        mockUserStats.currentPoints >= reward.points
                          ? 'bg-green-500 text-white'
                          : isDark
                          ? 'bg-gray-700'
                          : 'bg-gray-200'
                      }`}
                      disabled={mockUserStats.currentPoints < reward.points}
                    >
                      Resgatar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <div className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md p-6`}>
            {mockLeaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className={`flex items-center space-x-4 p-4 ${
                  index !== mockLeaderboard.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <Medal
                    className={`absolute -top-2 -right-2 w-6 h-6 ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                        ? 'text-gray-400'
                        : 'text-orange-500'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{entry.name}</h3>
                  <p className="text-sm text-gray-500">{entry.points} pontos</p>
                </div>
                <span className="text-2xl font-bold">#{index + 1}</span>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'goals' && (
          <div className={`rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md p-6`}>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Meta Mensal</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{mockUserStats.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${mockUserStats.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Faltam {mockUserStats.monthlyGoal - mockUserStats.currentPoints} pontos para atingir sua meta
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="text-sm text-gray-500">Ranking Geral</p>
                    <p className="text-xl font-bold">#{mockUserStats.rank}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
        ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default Rewards;