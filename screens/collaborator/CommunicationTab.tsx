
import React from 'react';
import CubeIcon from '../../components/icons/CubeIcon';
import BookOpenIcon from '../../components/icons/BookOpenIcon';

const ChatBubble: React.FC<{ message: string, time: string, isSender: boolean }> = ({ message, time, isSender }) => (
    <div className={`flex items-end space-x-2 ${isSender ? 'justify-end' : ''} mb-4`}>
        {!isSender && <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 border-2 border-white shadow-sm"></div>}
        <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${isSender ? 'bg-[#14B8A6] text-white rounded-br-sm' : 'bg-white text-gray-700 rounded-bl-sm'}`}>
            <p className="text-sm leading-snug">{message}</p>
        </div>
         <span className="text-[10px] text-gray-400 self-end pb-1">{time}</span>
    </div>
);


const CommunicationTab: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-[calc(100vh-64px)] rounded-t-[2.5rem] text-gray-800 p-6 space-y-6 shadow-inner mt-4">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h3 className="font-bold text-gray-700">Suporte Técnico (Central)</h3>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 text-xl font-bold px-2">&times;</button>
                </div>
                <div className="h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                   <div className="text-center my-4"><span className="bg-gray-100 text-gray-400 text-xs px-3 py-1 rounded-full">Hoje</span></div>
                   <ChatBubble message="Bom dia, Carlos. Chegou no cliente da Zona Sul?" time="08:15" isSender={false} />
                   <ChatBubble message="Bom dia! Sim, acabei de iniciar o check-in." time="08:16" isSender={true} />
                   <ChatBubble message="Ótimo. Lembre-se de verificar a pressão do gás, o cliente reclamou de baixo rendimento." time="08:17" isSender={false} />
                   <ChatBubble message="Pode deixar, vou fazer o teste completo de estanqueidade também." time="08:18" isSender={true} />
                   <ChatBubble message="Aguardando as fotos." time="08:20" isSender={false} />
                </div>
                <div className="mt-2 flex gap-2">
                    <input type="text" placeholder="Digite sua mensagem..." className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#14B8A6]" />
                    <button className="bg-[#0B4F6C] text-white rounded-full p-2 hover:bg-[#093e54]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wide">Ferramentas Rápidas</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl space-y-2 hover:bg-blue-100 transition-colors border border-blue-100">
                        <CubeIcon className="w-8 h-8 text-[#0B4F6C]"/>
                        <span className="text-sm font-bold text-[#0B4F6C]">Estoque Peças</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-xl space-y-2 hover:bg-teal-100 transition-colors border border-teal-100">
                        <BookOpenIcon className="w-8 h-8 text-[#14B8A6]"/>
                        <span className="text-sm font-bold text-[#14B8A6]">Manuais & FAQs</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunicationTab;
