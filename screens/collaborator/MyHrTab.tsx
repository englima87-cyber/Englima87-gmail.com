
import React, { useState, useEffect, useRef } from 'react';
import ArrowDownTrayIcon from '../../components/icons/ArrowDownTrayIcon';
import ShieldCheckIcon from '../../components/icons/ShieldCheckIcon';
import EnvelopeIcon from '../../components/icons/EnvelopeIcon';
import ClockIcon from '../../components/icons/ClockIcon';
import CalendarDaysIcon from '../../components/icons/CalendarDaysIcon';
import CurrencyDollarIcon from '../../components/icons/CurrencyDollarIcon';
import { Payslip, TimeBank, Vacation } from '../../types';

const payslips: Payslip[] = [
    { id: '1', referenceMonth: '2024-11', type: '13º Salário', baseSalary: 0, calculatedCommission: 0, totalNet: 1625.00, collaboratorId: '2', pdfUrl: '#' },
    { id: '2', referenceMonth: '2024-10', type: 'Mensal', baseSalary: 2500, calculatedCommission: 750, totalNet: 3250.00, collaboratorId: '2', pdfUrl: '#' },
    { id: '3', referenceMonth: '2024-09', type: 'Mensal', baseSalary: 2500, calculatedCommission: 600, totalNet: 3100.00, collaboratorId: '2', pdfUrl: '#' },
];

const certifications = [
    { name: 'NR-35 Trabalho em Altura', expiry: '2025-12-01', status: 'Válido', color: 'bg-green-100 text-green-700' },
    { name: 'NR-10 Instalações Elétricas', expiry: '2023-10-01', status: 'Vencido', color: 'bg-red-100 text-red-700' },
];

// Mock Data para o Colaborador Logado
const myTimeBank: TimeBank = {
    balance: 12.5, // Horas positivas
    workedHoursMonth: 168,
    overtime50: 8,
    overtime100: 4.5,
    negativeHours: 0,
    lastUpdated: '15/11/2024'
};

const myVacation: Vacation = {
    status: 'Acquisitivo',
    daysAvailable: 15,
    periodStart: '2025-02-10',
    periodEnd: '2025-02-25'
};

const formatMonth = (ref: string) => {
    const [year, month] = ref.split('-');
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
};

// --- New Modal for Time Adjustment Request ---
const TimeAdjustmentModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Solicitação enviada:\nData: ${date}\nHora: ${time}\nMotivo: ${reason}`);
        onClose();
        setDate('');
        setTime('');
        setReason('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-[#0B4F6C] p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" /> Ajuste de Ponto
                    </h3>
                    <button onClick={onClose} className="text-white/70 hover:text-white font-bold text-xl">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Data da Ocorrência</label>
                        <input 
                            type="date" 
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#14B8A6] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Horário Correto</label>
                        <input 
                            type="time" 
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#14B8A6] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Justificativa</label>
                        <textarea 
                            rows={3}
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Ex: Esqueci de bater o ponto na saída..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#14B8A6] outline-none resize-none"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">Cancelar</button>
                        <button type="submit" className="flex-1 py-2.5 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0d9488] transition-colors shadow-md text-sm">Enviar Solicitação</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- HR Chat Modal (Refined with AI Logic) ---
const HrChatModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai'}[]>([
        { text: "Olá, Carlos! Sou a assistente virtual do RH. Como posso te ajudar hoje?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const quickReplies = [
        "Reset de Senha",
        "Holerite / Salário",
        "Ajuste de Ponto",
        "Incluir Dependente",
        "Plano de Saúde"
    ];

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        const userMsg = text;
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        // Simple AI Logic
        setTimeout(() => {
            let response = "";
            const lowerText = userMsg.toLowerCase();

            if (lowerText.includes("senha") || lowerText.includes("reset")) {
                response = "Para resetar sua senha corporativa, acesse o portal web em 'Esqueci minha senha' ou solicite ao seu gestor imediato a redefinição temporária.";
            } else if (lowerText.includes("holerite") || lowerText.includes("salário") || lowerText.includes("pagamento")) {
                response = "Seus holerites estão disponíveis aqui mesmo na aba 'Meu RH'. Você pode visualizar e baixar os arquivos PDF dos últimos 12 meses.";
            } else if (lowerText.includes("ponto") || lowerText.includes("hora") || lowerText.includes("banco")) {
                response = "Questões sobre ponto eletrônico? Você pode visualizar seu saldo de banco de horas na tela anterior. Para ajustes manuais, utilize o botão 'Ajustar' no card de Banco de Horas.";
            } else if (lowerText.includes("dependente") || lowerText.includes("filho") || lowerText.includes("esposa")) {
                response = "Para inclusão de dependentes, por favor, envie a Certidão de Nascimento/Casamento e o CPF digitalizados para rh@servicepro.com. O prazo é de 5 dias úteis.";
            } else if (lowerText.includes("saúde") || lowerText.includes("plano") || lowerText.includes("médico") || lowerText.includes("odontológico")) {
                response = "Nossos planos de saúde (Unimed) e odontológico (OdontoPrev) têm carência de 30 dias. Para consultar a rede credenciada, acesse o app da operadora com seu número de carteirinha.";
            } else {
                response = "Entendi. Para esse assunto específico, vou abrir um chamado para a equipe humana de RH. Eles entrarão em contato em até 24h.";
            }

            setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
            setIsTyping(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-md h-[600px] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="bg-[#0B4F6C] p-4 flex justify-between items-center text-white shadow-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                            <EnvelopeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Suporte RH</h3>
                            <p className="text-xs text-blue-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online Agora
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white text-xl font-bold p-2">&times;</button>
                </div>

                {/* Chat Body */}
                <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4 scrollbar-hide">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
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
                            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex space-x-1 items-center h-8">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies & Input */}
                <div className="bg-white border-t border-gray-100 flex flex-col">
                    {!isTyping && (
                        <div className="flex gap-2 overflow-x-auto p-3 pb-0 scrollbar-hide">
                            {quickReplies.map((reply, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleSend(reply)}
                                    className="whitespace-nowrap bg-blue-50 text-[#0B4F6C] border border-blue-100 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors flex-shrink-0"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    <div className="p-3 flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && input.trim() && handleSend(input)}
                            placeholder="Digite sua mensagem..." 
                            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#14B8A6] outline-none"
                            autoFocus
                        />
                        <button 
                            onClick={() => input.trim() && handleSend(input)}
                            className="bg-[#14B8A6] text-white p-2.5 rounded-full hover:bg-[#0d9488] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!input.trim()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MyHrTab: React.FC = () => {
    const [isHrChatOpen, setIsHrChatOpen] = useState(false);
    const [isTimeAdjOpen, setIsTimeAdjOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)] rounded-t-[2.5rem] p-6 space-y-6 shadow-inner mt-4 text-gray-800 pb-24">
            
            {/* Header Info */}
            <div className="flex items-center space-x-4 mb-2">
                <img src="https://i.pravatar.cc/150?img=11" alt="Carlos" className="w-16 h-16 rounded-full border-2 border-[#14B8A6]" />
                <div>
                    <h2 className="text-xl font-bold text-[#0B4F6C]">Carlos Oliveira</h2>
                    <p className="text-sm text-gray-500">Técnico Sênior • Matrícula: 8839</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Status: Ativo</span>
                </div>
            </div>

            {/* Banco de Horas */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                
                <div className="flex justify-between items-start relative z-10">
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                        <ClockIcon className="w-5 h-5 text-[#14B8A6] mr-2" />
                        Banco de Horas
                    </h3>
                    <button 
                        onClick={() => setIsTimeAdjOpen(true)}
                        className="text-[10px] font-bold text-[#14B8A6] border border-[#14B8A6] px-2 py-1 rounded hover:bg-teal-50 transition-colors"
                    >
                        Ajustar
                    </button>
                </div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div>
                        <p className="text-sm text-gray-500">Saldo Atual</p>
                        <p className={`text-3xl font-bold ${myTimeBank.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {myTimeBank.balance > 0 ? '+' : ''}{myTimeBank.balance}h
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Atualizado em</p>
                        <p className="text-xs font-semibold text-gray-600">{myTimeBank.lastUpdated}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center relative z-10">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">HE 50%</p>
                        <p className="font-bold text-blue-700 text-sm">{myTimeBank.overtime50}h</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">HE 100%</p>
                        <p className="font-bold text-blue-700 text-sm">{myTimeBank.overtime100}h</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Faltas</p>
                        <p className="font-bold text-red-700 text-sm">{myTimeBank.negativeHours}h</p>
                    </div>
                </div>
            </div>

            {/* Férias */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                    <CalendarDaysIcon className="w-5 h-5 text-[#14B8A6] mr-2" />
                    Programação de Férias
                </h3>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl border border-yellow-100 mb-3">
                    <div>
                        <p className="text-xs text-yellow-800 font-bold uppercase">Próximo Período</p>
                        <p className="font-bold text-gray-800">{myVacation.periodStart ? 'Fevereiro 2025' : 'Não agendado'}</p>
                        <p className="text-xs text-gray-500">{myVacation.daysAvailable} dias disponíveis</p>
                    </div>
                    <span className="bg-white text-yellow-700 px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {myVacation.status}
                    </span>
                </div>
                <button className="w-full py-2 text-sm font-bold text-[#14B8A6] border border-[#14B8A6] rounded-lg hover:bg-teal-50 transition-colors">
                    Solicitar Férias
                </button>
            </div>

            {/* Holerites & 13º */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-700 flex items-center">
                        <CurrencyDollarIcon className="w-5 h-5 text-[#14B8A6] mr-2" />
                        Pagamentos
                    </h3>
                    <button className="text-xs text-[#14B8A6] font-bold">Ver Todos</button>
                </div>
                <div className="space-y-3">
                    {payslips.map((pay) => (
                        <div key={pay.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-gray-800 text-sm">{formatMonth(pay.referenceMonth)}</p>
                                    {pay.type !== 'Mensal' && (
                                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">{pay.type}</span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500">Líquido: <span className="font-bold text-green-600">R$ {pay.totalNet.toFixed(2)}</span></p>
                            </div>
                            <button className="p-2 bg-blue-50 text-[#0B4F6C] rounded-lg hover:bg-blue-100 transition-colors">
                                <ArrowDownTrayIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificações */}
            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                    <ShieldCheckIcon className="w-5 h-5 text-[#14B8A6] mr-2" />
                    Minhas Certificações
                </h3>
                <div className="space-y-3">
                    {certifications.map((cert, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div>
                                <p className="font-bold text-sm text-gray-800">{cert.name}</p>
                                <p className="text-xs text-gray-500">Vence em: {cert.expiry.split('-').reverse().join('/')}</p>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${cert.color}`}>
                                {cert.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Solicitações */}
            <div className="bg-[#0B4F6C] p-5 rounded-2xl shadow-lg text-white">
                <h3 className="font-bold mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <EnvelopeIcon className="w-5 h-5 mr-2" />
                        Fale com o RH
                    </div>
                    <button 
                        onClick={() => setIsHrChatOpen(true)}
                        className="bg-white text-[#0B4F6C] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-1"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Chat IA
                    </button>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-medium transition-colors border border-white/10">
                        Abono de Horas
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-medium transition-colors border border-white/10">
                        Adiantamento
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-medium transition-colors border border-white/10 col-span-2">
                        Enviar Atestado Médico
                    </button>
                </div>
            </div>

            {/* Chat Modal */}
            <HrChatModal isOpen={isHrChatOpen} onClose={() => setIsHrChatOpen(false)} />
            {/* Time Adjustment Modal */}
            <TimeAdjustmentModal isOpen={isTimeAdjOpen} onClose={() => setIsTimeAdjOpen(false)} />
        </div>
    );
};

export default MyHrTab;
