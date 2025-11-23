
import React, { useState, useEffect, useRef } from 'react';

// Icon for sending message
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const XMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const StarIcon: React.FC<{ filled: boolean, onClick: () => void }> = ({ filled, onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#F59E0B" : "none"} stroke={filled ? "#F59E0B" : "#CBD5E1"} strokeWidth={1.5} className="w-8 h-8 cursor-pointer transition-transform hover:scale-110">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

interface AIChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigateToQuote?: () => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, onClose, onNavigateToQuote }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Olá! Sou a Sofia, especialista virtual da ServicePro. Como posso ajudar a melhorar o clima do seu ambiente hoje?", sender: 'ai' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatState, setChatState] = useState<'active' | 'rating' | 'finished'>('active');
    const [protocol, setProtocol] = useState('');
    const [rating, setRating] = useState(0);
    
    const [suggestedActions, setSuggestedActions] = useState<string[]>([
        "Solicitar Orçamento", 
        "Suporte Técnico", 
        "Status do Chamado"
    ]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen, suggestedActions, chatState]);

    // Generate a random protocol
    const generateProtocol = () => {
        const date = new Date();
        const random = Math.floor(Math.random() * 10000);
        return `SP-${date.getFullYear()}${date.getMonth() + 1}-${random}`;
    };

    // "Brain" of the AI - Simple Keyword Analysis
    const analyzeIntent = (text: string) => {
        const lowerText = text.toLowerCase();
        let responseText = "";
        let nextActions: string[] = [];
        let shouldEnd = false;

        // Flow: Encerramento
        if (lowerText.includes("encerrar") || lowerText.includes("tchau") || lowerText.includes("fim") || lowerText.includes("obrigado") || lowerText.includes("fechar")) {
            const newProtocol = generateProtocol();
            setProtocol(newProtocol);
            responseText = `Foi um prazer atendê-lo! Para sua segurança, geramos o protocolo de atendimento #${newProtocol}. Antes de ir, poderia avaliar meu atendimento?`;
            nextActions = [];
            shouldEnd = true;
        }
        // Flow: Orçamento / Preço
        else if (lowerText.includes("orçamento") || lowerText.includes("preço") || lowerText.includes("quanto custa")) {
            responseText = "Para um orçamento preciso, preciso saber: é para residência ou empresa?";
            nextActions = ["Residência", "Empresa", "Condomínio", "Encerrar Atendimento"];
        }
        // Flow: Tipo de Local -> Tipo de Serviço
        else if (lowerText.includes("residência") || lowerText.includes("casa") || lowerText.includes("empresa")) {
            responseText = "Perfeito. Qual serviço você precisa?";
            nextActions = ["Instalação Nova", "Manutenção Preventiva", "Conserto (Corretiva)", "Encerrar Atendimento"];
        }
        // Flow: Problema Técnico
        else if (lowerText.includes("quebrado") || lowerText.includes("parou") || lowerText.includes("não gela") || lowerText.includes("suporte")) {
            responseText = "Sinto muito por isso. Para agilizar o suporte, qual é a marca do equipamento?";
            nextActions = ["Samsung", "LG", "Daikin", "Midea/Springer", "Encerrar Atendimento"];
        }
        // Flow: Status
        else if (lowerText.includes("status") || lowerText.includes("acompanhar") || lowerText.includes("técnico")) {
            responseText = "Você pode acompanhar seu técnico em tempo real pela aba 'Início' do aplicativo. Gostaria que eu verificasse se há técnicos próximos?";
            nextActions = ["Sim, verificar", "Não, obrigado", "Encerrar Atendimento"];
        }
        else {
            responseText = "Entendi. Vou transferir essa informação para nossa equipe humana. Enquanto isso, posso ajudar com mais alguma coisa?";
            nextActions = ["Solicitar Orçamento", "Dúvidas Técnicas", "Encerrar Atendimento"];
        }

        return { responseText, nextActions, shouldEnd };
    };

    const handleSendMessage = (textOverride?: string) => {
        const textToSend = textOverride || inputText;
        if (textToSend.trim() === '') return;

        // 1. Add User Message
        const newUserMessage: Message = {
            id: Date.now(),
            text: textToSend,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');
        setSuggestedActions([]); // Clear suggestions while thinking
        setIsTyping(true);

        // 2. AI Thinking Simulation
        setTimeout(() => {
            const { responseText, nextActions, shouldEnd } = analyzeIntent(textToSend);

            const newAiMessage: Message = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'ai'
            };
            
            setMessages(prev => [...prev, newAiMessage]);
            setSuggestedActions(nextActions);
            setIsTyping(false);

            if (shouldEnd) {
                setChatState('rating');
            }
        }, 1200);
    };

    const handleRating = (score: number) => {
        setRating(score);
        setTimeout(() => {
            setChatState('finished');
        }, 500);
    };

    const handleRedirect = () => {
        if (onNavigateToQuote) {
            onNavigateToQuote();
            onClose();
            // Reset chat for next time
            setTimeout(() => {
                setChatState('active');
                setMessages([{ id: 1, text: "Olá! Sou a Sofia, especialista virtual da ServicePro. Como posso ajudar a melhorar o clima do seu ambiente hoje?", sender: 'ai' }]);
                setSuggestedActions(["Solicitar Orçamento", "Suporte Técnico", "Status do Chamado"]);
            }, 1000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden animate-fade-in-up h-[550px]">
            {/* Header */}
            <div className="bg-[#0B4F6C] p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-teal-400 to-blue-500">
                             <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                                alt="Sofia AI" 
                                className="w-full h-full rounded-full border-2 border-white object-cover"
                            />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0B4F6C] rounded-full animate-pulse"></span>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Sofia</h3>
                        <p className="text-blue-200 text-xs flex items-center">
                            <span className="w-1 h-1 bg-blue-200 rounded-full mr-1"></span>
                            IA Especialista • Online
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                    <XMarkIcon />
                </button>
            </div>

            {/* Content Area based on State */}
            {chatState === 'active' ? (
                <>
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                                    msg.sender === 'user' 
                                    ? 'bg-[#14B8A6] text-white rounded-br-none' 
                                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex space-x-1 items-center h-10">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="bg-white border-t border-gray-100">
                        {suggestedActions.length > 0 && !isTyping && (
                            <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto scrollbar-hide">
                                {suggestedActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(action)}
                                        className="whitespace-nowrap bg-teal-50 text-[#14B8A6] border border-teal-100 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#14B8A6] hover:text-white transition-colors shadow-sm"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="p-3">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-teal-200 focus-within:bg-white transition-all">
                                <input 
                                    type="text" 
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Digite sua dúvida..."
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                                <button 
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputText.trim()}
                                    className={`p-1.5 rounded-full transition-colors ${inputText.trim() ? 'text-[#14B8A6] hover:bg-teal-50' : 'text-gray-400'}`}
                                >
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : chatState === 'rating' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50 animate-fade-in">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-teal-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B4F6C] mb-2">Atendimento Finalizado</h3>
                    <p className="text-gray-500 text-sm mb-6">Protocolo: <span className="font-mono font-bold text-gray-700">{protocol}</span></p>
                    
                    <p className="text-gray-700 font-medium mb-4">Como você avalia o suporte da Sofia?</p>
                    <div className="flex space-x-2 mb-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon key={star} filled={star <= rating} onClick={() => handleRating(star)} />
                        ))}
                    </div>
                    <p className="text-xs text-gray-400">Selecione as estrelas para continuar</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white animate-fade-in">
                    <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-teal-200 blur-xl opacity-50 rounded-full"></div>
                         <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                            alt="Sofia AI" 
                            className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover relative z-10"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0B4F6C] mb-2">Muito Obrigada!</h2>
                    <p className="text-gray-600 mb-8 max-w-xs">
                        Sua avaliação é fundamental para minha evolução. Conforme solicitado, clique abaixo para ser direcionado à área de Orçamentos.
                    </p>
                    
                    {onNavigateToQuote && (
                        <button 
                            onClick={handleRedirect}
                            className="w-full bg-[#14B8A6] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-[#0d9488] transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                            <span>Ir para Orçamento</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    )}
                     <button onClick={onClose} className="mt-4 text-gray-400 text-sm hover:text-gray-600 underline">
                        Fechar Janela
                    </button>
                </div>
            )}
        </div>
    );
};

export default AIChatWidget;
