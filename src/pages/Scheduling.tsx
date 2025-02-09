import React, { useState } from 'react';
import { Calendar, Clock, Users, X, Check, User, Moon, Sun, } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

// Dados para preenchimento
const MOCK_TRAINERS = [
{ id: 1, name: 'Carlos Silva', available: true },
{ id: 2, name: 'Ana Paula', available: true },
{ id: 3, name: 'Ricardo Santos', available: true },
];

const HOURS = [
{ time: '06:00', capacity: 15 },
{ time: '07:00', capacity: 45 },
{ time: '08:00', capacity: 75 },
{ time: '09:00', capacity: 60 },
{ time: '10:00', capacity: 30 },
{ time: '11:00', capacity: 25 },
{ time: '12:00', capacity: 80 },
{ time: '13:00', capacity: 65 },
{ time: '14:00', capacity: 20 },
{ time: '15:00', capacity: 15 },
{ time: '16:00', capacity: 35 },
{ time: '17:00', capacity: 85 },
{ time: '18:00', capacity: 95 },
{ time: '19:00', capacity: 90 },
{ time: '20:00', capacity: 70 },
];

function Scheduling() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [bookings, setBookings] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const maxCapacity = 100;

    const handleSchedule = () => {
        if (!selectedTime || !selectedTrainer) return;

        const newBooking = {
        id: Date.now(),
        date: selectedDate,
        time: selectedTime,
        trainer: selectedTrainer,
        };
        setBookings([...bookings, newBooking]);
        setShowConfirmation(true);
        
        // Reset selections
        setSelectedTime('');
        setSelectedTrainer('');
    };

    const handleCancel = (bookingId) => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
    };

    const getCapacityColor = (capacity) => {
        if (capacity >= 80) return 'bg-red-600';
        if (capacity >= 50) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getCapacityText = (capacity) => {
        if (capacity >= 80) return 'Horário de Pico';
        if (capacity >= 50) return 'Movimento Moderado';
        return 'Pouco Movimento';
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Header */}
        <nav className={`fixed top-0 w-full ${isDark ? 'bg-[#1e2538]' : 'bg-white'} shadow-md z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate("/menu")}> 
                        <Calendar className="w-6 h-6 text-blue-500" />
                        <span className={`ml-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Agendamentos</span>
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

        <main className="max-w-7xl mx-auto px-4 py-20">
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isDark ? 'bg-gray-800' : 'bg-white'} gap-6`}>
            {/* Left Column - Scheduling */}
            <div className={`space-y-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Date and Time Selection */}
                <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-8' : 'bg-gray-100'} shadow-sm`}>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Data e Horário
                </h2>
                <input
                    type="date"
                    className={`w-full mb-4 p-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} border rounded`}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
                <div className={`space-y-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {HOURS.map(({ time, capacity }) => (
                    <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full p-3 rounded flex justify-between ${isDark ? 'bg-gray-700' : 'bg-gray-100'} items-center ${
                        selectedTime === time
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-300'
                        }`}
                    >
                        <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{time}</span>
                        </div>
                        <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getCapacityColor(capacity)} mr-2`}></div>
                        <span className="text-sm">{getCapacityText(capacity)}</span>
                        <span className="text-sm ml-2">({capacity}%)</span>
                        </div>
                    </button>
                    ))}
                </div>
                </div>

                {/* Trainer Selection */}
                <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'} shadow-sm`}>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profissionais Disponíveis
                </h2>
                <div className="space-y-2">
                    {MOCK_TRAINERS.map((trainer) => (
                    <button
                        key={trainer.id}
                        onClick={() => setSelectedTrainer(trainer.name)}
                        className={`w-full p-3 rounded flex justify-between ${isDark ? 'bg-gray-700' : 'bg-gray-100'} items-center ${
                        selectedTrainer === trainer.name
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        <span>{trainer.name}</span>
                        <span>{trainer.available ? 'Disponível' : 'Ocupado'}</span>
                    </button>
                    ))}
                </div>
                </div>

                {/* Schedule Button */}
                <button
                onClick={handleSchedule}
                disabled={!selectedTime || !selectedTrainer}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
                >
                Agendar Horário
                </button>
            </div>

            {/* Right Column - Bookings */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h2 className="text-lg font-semibold mb-4">Meus Agendamentos</h2>
                <div className={`space-y-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded p-4">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="font-semibold">
                            {booking.date.toLocaleDateString()} - {booking.time}
                        </p>
                        <p className={`text-sm ${isDark ? ' text-gray-100' : 'text-gray-600'}`}>
                            Profissional: {booking.trainer}
                        </p>
                        </div>
                        <button
                        onClick={() => handleCancel(booking.id)}
                        className="text-red-600 hover:text-red-800"
                        >
                        <X className="w-5 h-5" />
                        </button>
                    </div>
                    </div>
                ))}
                {bookings.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                    Nenhum agendamento encontrado
                    </p>
                )}
                </div>
            </div>
            </div>
        </main>

        {/* Confirmation Modal */}
        {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
                <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 rounded-full p-2">
                    <Check className="w-6 h-6 text-green-600" />
                </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">
                Agendamento Confirmado!
                </h3>
                <p className="text-gray-600 text-center mb-4">
                Seu horário foi agendado com sucesso.
                </p>
                <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                Fechar
                </button>
            </div>
            </div>
        )}
        </div>
    );
}

export default Scheduling;