import React from 'react';
import { MessageSquare, ThumbsUp, Share2, Moon, Sun, Users} from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Community = () => {
    const posts = [
        {
        id: 1,
        title: 'Novos equipamentos chegando!',
        content: 'Estamos muito felizes em anunciar que novos equipamentos de musculação chegarão na próxima semana! Entre as novidades, teremos esteiras de última geração com telas touch screen integradas, novos equipamentos para treino funcional e uma área completamente renovada para exercícios de peso livre. Estas atualizações fazem parte do nosso compromisso contínuo em oferecer a melhor experiência possível para nossos alunos.',
        author: 'Academia Wellmize',
        date: '2 horas atrás',
        likes: 24,
        comments: 8,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop'
        },
        {
        id: 2,
        title: 'Dica de Nutrição: Proteínas',
        content: 'A importância das proteínas na sua dieta não pode ser subestimada, especialmente para quem pratica atividades físicas regularmente. Proteínas são essenciais para a recuperação muscular, manutenção da massa magra e até mesmo para o bom funcionamento do sistema imunológico. Neste post, vamos explorar as melhores fontes de proteína e como incorporá-las adequadamente em sua rotina alimentar.',
        author: 'Nutricionista Ana',
        date: '5 horas atrás',
        likes: 45,
        comments: 12,
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop'
        },
        {
        id: 3,
        title: 'Nova Turma de Yoga',
        content: 'Começando no próximo mês, teremos uma nova turma de yoga para iniciantes! As aulas acontecerão nas terças e quintas, das 7h às 8h, com a professora Maria. Venha experimentar esta prática milenar que combina exercícios físicos, respiração e meditação para promover bem-estar físico e mental.',
        author: 'Coordenação Wellmize',
        date: '1 dia atrás',
        likes: 32,
        comments: 15,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop'
        }
    ];

    const forumTopics = [
        {
        id: 1,
        title: 'Dúvida sobre treino de pernas',
        author: 'João Silva',
        replies: 15,
        lastActivity: '30 minutos atrás',
        preview: 'Pessoal, estou com uma dúvida sobre a execução correta do agachamento. Alguém poderia me ajudar?'
        },
        {
        id: 2,
        title: 'Compartilhando minha evolução',
        author: 'Maria Santos',
        replies: 28,
        lastActivity: '1 hora atrás',
        preview: '3 meses de treino consistente e já posso ver resultados impressionantes! Aqui está minha jornada...'
        },
        {
        id: 3,
        title: 'Dicas para treinar no calor',
        author: 'Pedro Costa',
        replies: 22,
        lastActivity: '2 horas atrás',
        preview: 'Com o verão chegando, quais são as melhores práticas para manter o treino mesmo nos dias mais quentes?'
        }
    ];

    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <nav className={`fixed top-0 w-full ${isDark ? 'bg-[#1e2538]' : 'bg-white'} shadow-md z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate("/menu")}> 
                        <Users className="w-6 h-6 text-blue-500" />
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
                    </div>
                </div>
            </div>
            </nav>
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-20">
                <section>
                    <h2 className="text-3xl font-bold mb-8">Novidades da Academia</h2>
                    <div className="space-y-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                            {post.content}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-4">
                                <span className="font-medium">{post.author}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center space-x-6">
                                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                                <ThumbsUp size={20} />
                                <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                                <MessageSquare size={20} />
                                <span>{post.comments}</span>
                                </button>
                                <button className="hover:text-blue-500 transition-colors">
                                <Share2 size={20} />
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-3xl font-bold mb-8">Fórum da Comunidade</h2>
                    <div className="space-y-4">
                    {forumTopics.map((topic) => (
                        <div key={topic.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <div className="space-y-4">
                            <div>
                            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{topic.preview}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-4">
                                <span className="font-medium">{topic.author}</span>
                                <span>•</span>
                                <span>{topic.lastActivity}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageSquare size={18} />
                                <span>{topic.replies} respostas</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Community;