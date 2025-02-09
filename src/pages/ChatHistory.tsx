import React, { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

// Mock data for chat history
const mockChatHistory = [
  {
    id: 1,
    content: "Professor, pode me ajudar com a série de exercícios?",
    sender: "João Silva",
    timestamp: "07:45",
    type: "sent",
  },
  {
    id: 2,
    content: "Claro, João! Qual exercício está com dúvida?",
    sender: "Prof. André Silva",
    timestamp: "07:47",
    type: "received",
  },
  {
    id: 3,
    content: "Na série de peito, não estou sentindo muito o músculo trabalhar",
    sender: "João Silva",
    timestamp: "07:48",
    type: "sent",
  },
  {
    id: 4,
    content:
      "Vou te encontrar na área dos equipamentos para ajustar sua postura e técnica. Pode ser agora?",
    sender: "Prof. André Silva",
    timestamp: "07:50",
    type: "received",
  },
];

interface ChatHistoryProps {
  darkMode: boolean;
  onBack: () => void;
  contactName: string;
}

function ChatHistory({ darkMode, onBack, contactName }: ChatHistoryProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md z-50`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-xl font-bold">{contactName}</span>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="container mx-auto px-4 py-20 pb-24">
        <div className="space-y-4">
          {mockChatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "sent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === "sent"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                } shadow-md`}
              >
                <p className="mb-1">{message.content}</p>
                <span className="text-xs opacity-75">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className={`fixed bottom-0 left-0 right-0 p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="container mx-auto flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className={`flex-1 px-4 py-2 rounded-full ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatHistory;
