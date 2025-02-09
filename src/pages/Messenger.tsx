import React, { useState } from 'react';
import { MessageSquare, Bell, Moon, Sun } from 'lucide-react';
import ChatHistory from './ChatHistory.tsx';
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

// Dados para demonstração
const mockMessages = [
  {
    id: 1,
    type: 'motivational',
    content: 'Ótimo progresso essa semana, João! Continue assim! 💪',
    sender: 'Prof. André Silva',
    timestamp: '10:30',
    read: true
  },
  {
    id: 2,
    type: 'reminder',
    content: 'Lembre-se de manter a hidratação durante os exercícios hoje!',
    sender: 'Sistema',
    timestamp: '09:15',
    read: false
  },
  {
    id: 3,
    type: 'entry',
    content: 'João Silva acabou de entrar na academia',
    sender: 'Sistema',
    timestamp: '08:00',
    read: true
  },
  {
    id: 4,
    type: 'direct',
    content: 'Professor, pode me ajudar com a série de exercícios?',
    sender: 'Prof. André Silva',
    timestamp: '07:45',
    read: true
  }
];

function Messenger() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
  const [showNotification, setShowNotification] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');

  const filteredMessages = mockMessages.filter(message => {
    if (selectedTab === 'all') return true;
    return message.type === selectedTab;
  });

  const handleOpenChat = (sender: string) => {
    setSelectedContact(sender);
    setShowChat(true);
  };

  if (showChat) {
    return (
      <ChatHistory
        darkMode={isDark}
        onBack={() => setShowChat(false)}
        contactName={selectedContact}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <nav className={`fixed top-0 w-full shadow-lg z-50 transition-colors duration-300 ${isDark ? "bg-[#1e2538]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/menu")}> 
              <MessageSquare className="w-6 h-6 text-blue-500" />
              <span className={`ml-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Mensagens
              </span>
              
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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-20 pb-4">
        {/* Message Filters */}
        <div className="mb-6 flex space-x-2 overflow-x-auto">
          <FilterButton
            active={selectedTab === 'all'}
            onClick={() => setSelectedTab('all')}
            label="Todas"
          />
          <FilterButton
            active={selectedTab === 'motivational'}
            onClick={() => setSelectedTab('motivational')}
            label="Motivacionais"
          />
          <FilterButton
            active={selectedTab === 'reminder'}
            onClick={() => setSelectedTab('reminder')}
            label="Lembretes"
          />
          <FilterButton
            active={selectedTab === 'direct'}
            onClick={() => setSelectedTab('direct')}
            label="Mensagens Diretas"
          />
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => message.type === 'direct' && handleOpenChat(message.sender)}
              className={`cursor-pointer p-4 rounded-lg shadow-md transition-transform hover:scale-[1.02] ${isDark ? "bg-[#1e2538] text-white" : "bg-white text-gray-900"}`}
            >

              <MessageCard
                message={message}
                darkMode={isDark}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
        ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      {label}
    </button>
  );
}

interface Message {
    id: number;
    type: string;
    content: string;
    sender: string;
    timestamp: string;
    read: boolean;
}
  

function MessageCard({ message, darkMode }: { message: Message; darkMode: boolean }) {
  return (
    <div
      className={`p-4 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-md transition-transform hover:scale-[1.02]`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{message.sender}</span>
          {!message.read && (
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </div>
        <span className="text-sm text-gray-500">{message.timestamp}</span>
      </div>
      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {message.content}
      </p>
    </div>
  );
}

export default Messenger;