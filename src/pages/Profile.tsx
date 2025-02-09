import React, { useState, useRef } from "react";
import {
  User,
  Moon,
  Sun,
  Search,
  Save,
  X,
  Camera,
  Edit2,
  Clock,
  CreditCard,
  Heart,
  Briefcase,
  Building2,
  Users,
  FileText,
  ChevronRight,
  Upload,
  Trash2,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

type ProfileType = "student" | "teacher" | "manager";

interface PersonalData {
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  rg: string;
}

const mockStudentData = {
  personal: {
    name: "João Silva",
    gender: "Masculino",
    birthDate: "1990-05-15",
    email: "joao.silva@email.com",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    rg: "12.345.678-9",
  },
  trainingSchedule: [
    { day: "Segunda", time: "07:00 - 08:00" },
    { day: "Quarta", time: "07:00 - 08:00" },
    { day: "Sexta", time: "07:00 - 08:00" },
  ],
  payment: {
    status: "Em dia",
    lastPayment: "2024-02-15",
    nextDue: "2024-03-15",
  },
  health: {
    medications: ["Vitamina D", "Ômega 3"],
    conditions: ["Nenhuma"],
    disabilities: ["Nenhuma"],
  },
};

const mockTeacherData = {
  personal: {
    name: "André Santos",
    gender: "Masculino",
    birthDate: "1985-03-20",
    email: "andre.santos@email.com",
    cpf: "987.654.321-00",
    phone: "(11) 98765-1234",
    address: "Av. Principal, 456",
    rg: "98.765.432-1",
  },
  professional: {
    cref: "123456-G/SP",
    category: "Personal Trainer Senior",
    studentCount: 25,
  },
};

const mockManagerData = {
  personal: {
    name: "Maria Oliveira",
    gender: "Feminino",
    birthDate: "1980-08-10",
    email: "maria.oliveira@email.com",
    cpf: "456.789.123-00",
    phone: "(11) 98765-5678",
    address: "Rua Comercial, 789",
    rg: "45.678.901-2",
  },
  gym: {
    cnpj: "12.345.678/0001-90",
    name: "Academia Wellmize",
    address: "Av. Fitness, 1000",
    hours: "06:00 - 22:00",
    phone: "(11) 3333-4444",
  },
  stats: {
    totalStudents: 350,
    activeEmployees: 15,
    morningStudents: 150,
    afternoonStudents: 100,
    eveningStudents: 100,
  },
};

function Profile() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] =
    useState<ProfileType>("student");
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
  );
  const [showImageMenu, setShowImageMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setEditMode(false);
    // Salvar as alterações no backend
    console.log("Saving changes...");
  };

  const handleImageClick = () => {
    setShowImageMenu(!showImageMenu);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
    setShowImageMenu(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
    );
    setShowImageMenu(false);
  };

  const renderPersonalDataSection = (data: PersonalData) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <InputField
        label="Nome Completo"
        value={data.name}
        disabled={!editMode}
      />
      <InputField label="Gênero" value={data.gender} disabled={!editMode} />
      <InputField
        label="Data de Nascimento"
        value={data.birthDate}
        type="date"
        disabled={!editMode}
      />
      <InputField
        label="E-mail"
        value={data.email}
        type="email"
        disabled={!editMode}
      />
      <InputField label="CPF" value={data.cpf} disabled={!editMode} />
      <InputField label="Telefone" value={data.phone} disabled={!editMode} />
      <InputField
        label="Endereço"
        value={data.address}
        className="md:col-span-2"
        disabled={!editMode}
      />
      <InputField label="RG" value={data.rg} disabled={!editMode} />
    </div>
  );

  const renderStudentProfile = () => (
    <div className="space-y-6">
      <div
        className={`p-6 rounded-lg ${
        isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Dados Pessoais
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        {renderPersonalDataSection(mockStudentData.personal)}
      </div>

      <div
        className={`p-6 rounded-lg ${
        isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5" />
          Horários de Treino
        </h2>
        <div className="space-y-2">
          {mockStudentData.trainingSchedule.map((schedule, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
              } flex justify-between items-center`}
            >
              <span>{schedule.day}</span>
              <span>{schedule.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`p-6 rounded-lg ${
          isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5" />
          Dados Financeiros
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-lg font-semibold text-green-500">
              {mockStudentData.payment.status}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Último Pagamento</p>
            <p className="text-lg font-semibold">
              {new Date(
                mockStudentData.payment.lastPayment
              ).toLocaleDateString()}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Próximo Vencimento</p>
            <p className="text-lg font-semibold">
              {new Date(mockStudentData.payment.nextDue).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5" />
          Informações de Saúde
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Medicamentos</h3>
            <div className="flex flex-wrap gap-2">
              {mockStudentData.health.medications.map((med, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {med}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Patologias</h3>
            <div className="flex flex-wrap gap-2">
              {mockStudentData.health.conditions.map((condition, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherProfile = () => (
    <div className="space-y-6">
      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Dados Pessoais
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        {renderPersonalDataSection(mockTeacherData.personal)}
      </div>

      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5" />
          Informações Profissionais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">CREF</p>
            <p className="text-lg font-semibold">
              {mockTeacherData.professional.cref}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Categoria</p>
            <p className="text-lg font-semibold">
              {mockTeacherData.professional.category}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Alunos</p>
            <p className="text-lg font-semibold">
              {mockTeacherData.professional.studentCount}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Fichas dos Alunos
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar aluno..."
              className={`pl-10 pr-4 py-2 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
              } flex justify-between items-center cursor-pointer hover:bg-opacity-80`}
            >
              <div>
                <p className="font-medium">Aluno {index + 1}</p>
                <p className="text-sm text-gray-500">
                  Última atualização: {new Date().toLocaleDateString()}
                </p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderManagerProfile = () => (
    <div className="space-y-6">
      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Dados Pessoais
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
        {renderPersonalDataSection(mockManagerData.personal)}
      </div>

      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5" />
          Informações da Academia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="CNPJ"
            value={mockManagerData.gym.cnpj}
            disabled={!editMode}
          />
          <InputField
            label="Nome da Academia"
            value={mockManagerData.gym.name}
            disabled={!editMode}
          />
          <InputField
            label="Endereço"
            value={mockManagerData.gym.address}
            disabled={!editMode}
          />
          <InputField
            label="Horário de Funcionamento"
            value={mockManagerData.gym.hours}
            disabled={!editMode}
          />
          <InputField
            label="Telefone"
            value={mockManagerData.gym.phone}
            disabled={!editMode}
          />
        </div>
      </div>

      <div
        className={`p-6 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Users className="w-5 h-5" />
          Controle de Acesso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Total de Alunos</p>
            <p className="text-2xl font-bold">
              {mockManagerData.stats.totalStudents}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Funcionários Ativos</p>
            <p className="text-2xl font-bold">
              {mockManagerData.stats.activeEmployees}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">Alunos por Turno</p>
            <div className="space-y-1 mt-2">
              <p className="text-sm">
                Manhã: {mockManagerData.stats.morningStudents}
              </p>
              <p className="text-sm">
                Tarde: {mockManagerData.stats.afternoonStudents}
              </p>
              <p className="text-sm">
                Noite: {mockManagerData.stats.eveningStudents}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
        {/* Header */}
        <nav className={`fixed top-0 w-full ${isDark ? "bg-gray-800" : "bg-white"} shadow-md z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate("/menu")}> 
                        <User className="w-6 h-6 text-blue-500" />
                        <span className={`ml-2 text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Perfil</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark ? "hover:bg-[#252b3b]" : "hover:bg-gray-100"}`}
                        >
                            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                        </button>
                    <div className="relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <button onClick={handleImageClick} className="relative">
                            <img
                            src={profileImage}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                            />
                        </button>
                        {showImageMenu && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${isDark ? "bg-gray-800" : "bg-white"} ring-1 ring-black ring-opacity-5 z-50`}>
                                <div className="py-1">
                                    <button
                                    onClick={handleImageUpload}
                                    className={`flex items-center w-full px-4 py-2 text-sm ${
                                        isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                    >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Carregar nova foto
                                    </button>
                                    <button
                                    onClick={handleRemoveImage}
                                    className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${
                                        isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                    }`}
                                    >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remover foto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {editMode && (
                    <div className="flex items-center space-x-2">
                        <button
                        onClick={() => setEditMode(false)}
                        className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                        >
                        <X className="w-5 h-5" />
                        </button>
                        <button
                        onClick={handleSave}
                        className="p-2 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-green-900"
                        >
                        <Save className="w-5 h-5" />
                        </button>
                    </div>
                    )}
                </div>
            </div>
            </div>
        </nav>

      {/* Selecionar o tipo de Perfil */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex space-x-2 mb-6 overflow-x-auto">
            <ProfileTab
                active={selectedProfile === "student"}
                onClick={() => setSelectedProfile("student")}
                label="Aluno"
            />
            <ProfileTab
                active={selectedProfile === "teacher"}
                onClick={() => setSelectedProfile("teacher")}
                label="Professor"
            />
            <ProfileTab
                active={selectedProfile === "manager"}
                onClick={() => setSelectedProfile("manager")}
                label="Gerente"
            />
            </div>

            {/* Conteudo do Perfil */}
            <div className="pb-8">
            {selectedProfile === "student" && renderStudentProfile()}
            {selectedProfile === "teacher" && renderTeacherProfile()}
            {selectedProfile === "manager" && renderManagerProfile()}
            </div>
        </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

function InputField({
  label,
  value,
  type = "text",
  disabled = true,
  className = "",
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg 'bg-gray-200' border-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
}

function ProfileTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
        ${
          active
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
    >
      {label}
    </button>
  );
}

export default Profile;
