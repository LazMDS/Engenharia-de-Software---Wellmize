import React from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle2 } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Sobre a Wellmize
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="flex items-center gap-2 mb-8">
              <p className="text-xl text-gray-600">
               A revolução no controle de acesso e gestão de academias!
              </p>
            </div>

            <p className="mb-6">
              Sabemos que manter o fluxo de alunos organizado e oferecer uma experiência moderna e eficiente pode ser um grande desafio para academias de todos os tamanhos. Pensando nisso, criamos o Wellmize, um sistema inovador que substitui catracas tradicionais por um controle de acesso inteligente via QR Code, reduzindo custos e otimizando a operação do seu espaço fitness.
            </p>

            <p className="mb-6">
              Com uma interface intuitiva e recursos completos, o Wellmize permite que alunos façam check-in e check-out pelo celular, gestores acompanhem relatórios em tempo real, professores tenham acesso às fichas dos alunos e a academia melhore a comunicação com seu público por meio de notificações motivacionais e gamificação.
            </p>

            <p className="mb-8">
              Nosso objetivo é automatizar tarefas, facilitar a vida dos gestores e criar uma experiência mais fluida e interativa para os alunos. O Wellmize não é apenas um sistema de controle de acesso — é um parceiro na evolução da sua academia!
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recursos principais:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Check-in e check-out por QR Code</h3>
                  <p className="text-gray-600">Elimine filas e custos com catracas</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Monitoramento de fluxo em tempo real</h3>
                  <p className="text-gray-600">Saiba exatamente quantos alunos estão na academia</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Relatórios de retenção e engajamento</h3>
                  <p className="text-gray-600">Entenda os hábitos dos seus alunos</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Mensagens motivacionais</h3>
                  <p className="text-gray-600">Incentive a frequência e o desempenho com notificações personalizadas</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Gamificação e desafios</h3>
                  <p className="text-gray-600">Transforme o treino em uma experiência mais dinâmica</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Agendamentos e controle de lotação</h3>
                  <p className="text-gray-600">Otimize o uso do espaço e dos aparelhos</p>
                </div>
              </div>
            </div>

            <p className="mb-6">
              Nosso compromisso é inovar e tornar a gestão de academias mais simples e eficiente. Se você busca uma solução moderna, acessível e completa para sua academia, o Wellmize é a escolha certa!
            </p>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-center mb-6">
                Quer saber mais? Entre em contato!
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                // Add form submission logic here
                alert('Email enviado com sucesso!');
              }} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Seu email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Digite seu email"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Digite sua mensagem aqui..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-hover">
                  <span className="flex items-center justify-center gap-2">
                    Enviar mensagem
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
