
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../components/icons/ChevronRightIcon';
import PhoneIcon from '../../components/icons/PhoneIcon';
import EnvelopeIcon from '../../components/icons/EnvelopeIcon';
import PlusIcon from '../../components/icons/PlusIcon';
import IdentificationIcon from '../../components/icons/IdentificationIcon';
import ClockIcon from '../../components/icons/ClockIcon';
import { User } from '../../types';

const performanceData = [
  { name: 'Jan', value: 40 },
  { name: 'Fev', value: 20 },
  { name: 'Mar', value: 70 },
  { name: 'Abr', value: 20 },
  { name: 'Mai', value: 28 },
];

const Calendar: React.FC = () => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-800"><ChevronLeftIcon className="w-5 h-5"/></button>
        <h3 className="font-bold text-gray-700">Outubro 2024</h3>
        <button className="text-gray-500 hover:text-gray-800"><ChevronRightIcon className="w-5 h-5"/></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-800">
        {dates.map(date => (
          <div key={date} className="relative flex justify-center items-center h-8">
            <span className={date === 22 ? 'bg-teal-500 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''}>
              {date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceChart: React.FC = () => (
  <div className="bg-white p-4 rounded-xl shadow-md h-full">
    <h3 className="font-bold text-gray-700 mb-2">Performance da Equipe</h3>
    <p className="text-sm text-gray-500 mb-4">Chamados Concluídos (Mês)</p>
    <div className="h-40">
       <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }}/>
                <YAxis hide={true} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}}/>
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#0B4F6C' : '#60A5FA'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  </div>
);

// Mock Inicial de Colaboradores com dados expandidos de RH
const initialCollaborators: User[] = [
    { 
        uid: '2', name: 'Carlos Oliveira', email: 'carlos@servicepro.com', role: 'collaborator', active: true, branchId: 'CENTRO',
        registrationId: '8839', password: '000', phone: '(11) 99876-5432', img: 'https://i.pravatar.cc/150?img=11',
        details: 'Técnico Nível 3', activityStatus: 'Ativo',
        timeBank: { balance: 12.5, workedHoursMonth: 168, overtime50: 8, overtime100: 4.5, negativeHours: 0, lastUpdated: 'Now' }
    },
    { 
        uid: '3', name: 'João Silva', email: 'joao@servicepro.com', role: 'collaborator', active: true, branchId: 'SUL',
        registrationId: '8840', password: '123', phone: '(11) 98888-1111', img: 'https://i.pravatar.cc/150?img=12',
        details: 'Técnico Júnior', activityStatus: 'Férias',
        timeBank: { balance: -4, workedHoursMonth: 0, overtime50: 0, overtime100: 0, negativeHours: 4, lastUpdated: 'Now' }
    },
    { 
        uid: '5', name: 'Mariana Costa', email: 'mariana@servicepro.com', role: 'collaborator', active: false, branchId: 'CENTRO',
        registrationId: '8841', password: '000', phone: '(11) 97777-2222', img: 'https://i.pravatar.cc/150?img=5',
        details: 'Especialista em Refrigeração', activityStatus: 'Afastado',
        timeBank: { balance: 0, workedHoursMonth: 0, overtime50: 0, overtime100: 0, negativeHours: 0, lastUpdated: 'Now' }
    }
];

const EquipeTab: React.FC = () => {
  const [collaborators, setCollaborators] = useState<User[]>(initialCollaborators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColabName, setNewColabName] = useState('');
  const [newColabEmail, setNewColabEmail] = useState('');
  const [newColabPhone, setNewColabPhone] = useState('');

  const handleAddCollaborator = () => {
      if (!newColabName || !newColabEmail) return;

      const lastId = Math.max(...collaborators.map(c => parseInt(c.registrationId || '0')));
      const newRegistrationId = (lastId + 1).toString().padStart(4, '0');

      const newCollaborator: User = {
          uid: Date.now().toString(),
          name: newColabName,
          email: newColabEmail,
          phone: newColabPhone,
          role: 'collaborator',
          active: true,
          branchId: 'CENTRO',
          img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          details: 'Novo Técnico',
          registrationId: newRegistrationId,
          password: '000',
          activityStatus: 'Ativo',
          timeBank: { balance: 0, workedHoursMonth: 0, overtime50: 0, overtime100: 0, negativeHours: 0, lastUpdated: 'Now' }
      };

      setCollaborators([...collaborators, newCollaborator]);
      setIsModalOpen(false);
      setNewColabName('');
      setNewColabEmail('');
      setNewColabPhone('');
  };

  const handleResetPassword = (uid: string) => {
      if (window.confirm('Deseja resetar a senha deste colaborador para "000"?')) {
          setCollaborators(collaborators.map(c => c.uid === uid ? { ...c, password: '000' } : c));
          alert('Senha redefinida com sucesso para 000');
      }
  }

  const changeStatus = (uid: string, newStatus: User['activityStatus']) => {
      setCollaborators(collaborators.map(c => c.uid === uid ? { ...c, activityStatus: newStatus, active: newStatus === 'Ativo' } : c));
  }

  return (
    <div className="space-y-6 pb-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Calendar />
        <PerformanceChart />
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg flex items-center">
                  <IdentificationIcon className="w-5 h-5 mr-2 text-[#0B4F6C]" />
                  Quadro de Colaboradores & Ponto
              </h3>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 bg-[#0B4F6C] text-white px-4 py-2 rounded-lg hover:bg-[#093e54] transition-colors text-sm font-bold shadow-sm">
                  <PlusIcon className="w-4 h-4" />
                  <span>Novo Colaborador</span>
              </button>
          </div>
          
          <div className="divide-y divide-gray-100">
              {collaborators.map(colab => (
                  <div key={colab.uid} className="p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4 min-w-[200px]">
                          <div className="relative">
                              <img src={colab.img} alt={colab.name} className={`w-14 h-14 rounded-full border-2 ${colab.activityStatus === 'Ativo' ? 'border-green-400' : colab.activityStatus === 'Férias' ? 'border-yellow-400' : 'border-gray-300 grayscale'}`} />
                              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${colab.activityStatus === 'Ativo' ? 'bg-green-500' : colab.activityStatus === 'Férias' ? 'bg-yellow-500' : 'bg-gray-400'}`}></span>
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-800">{colab.name}</h4>
                              <p className="text-xs text-gray-500 mb-1">{colab.details}</p>
                              <div className="flex items-center space-x-2">
                                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200">Mat: {colab.registrationId}</span>
                              </div>
                          </div>
                      </div>

                      {/* Time Bank Summary */}
                      <div className="flex flex-1 justify-around w-full lg:w-auto bg-gray-50 p-2 rounded-lg border border-gray-100">
                          <div className="text-center">
                              <p className="text-[10px] text-gray-500 uppercase">Banco Horas</p>
                              <p className={`text-sm font-bold ${colab.timeBank?.balance && colab.timeBank.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {colab.timeBank?.balance}h
                              </p>
                          </div>
                          <div className="w-px bg-gray-200"></div>
                          <div className="text-center">
                              <p className="text-[10px] text-gray-500 uppercase">H.E. (Mês)</p>
                              <p className="text-sm font-bold text-blue-600">{colab.timeBank?.overtime50}h</p>
                          </div>
                          <div className="w-px bg-gray-200"></div>
                          <div className="text-center">
                              <p className="text-[10px] text-gray-500 uppercase">Faltas</p>
                              <p className="text-sm font-bold text-red-500">{colab.timeBank?.negativeHours}h</p>
                          </div>
                      </div>

                      <div className="flex flex-col space-y-2 w-full lg:w-auto min-w-[180px]">
                          <div className="flex items-center justify-between text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                              <span className="text-gray-500 font-medium">Status Atual:</span>
                              <select 
                                value={colab.activityStatus} 
                                onChange={(e) => changeStatus(colab.uid, e.target.value as any)}
                                className={`font-bold bg-transparent outline-none cursor-pointer ${colab.activityStatus === 'Ativo' ? 'text-green-600' : colab.activityStatus === 'Férias' ? 'text-yellow-600' : 'text-gray-600'}`}
                              >
                                  <option value="Ativo">🟢 Ativo</option>
                                  <option value="Férias">🏖️ Férias</option>
                                  <option value="Afastado">🏥 Afastado</option>
                                  <option value="Folga">⚪ Folga</option>
                              </select>
                          </div>
                          <div className="flex justify-end gap-2">
                             <button onClick={() => handleResetPassword(colab.uid)} className="text-[10px] text-blue-600 hover:underline font-semibold">
                                 Resetar Senha
                             </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Modal Novo Colaborador */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                  <div className="bg-[#0B4F6C] p-4 text-white">
                      <h3 className="font-bold text-lg">Cadastrar Novo Colaborador</h3>
                      <p className="text-xs text-blue-200">O login e senha serão gerados automaticamente.</p>
                  </div>
                  <div className="p-6 space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
                          <input type="text" value={newColabName} onChange={e => setNewColabName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none" placeholder="Ex: Ana Pereira" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Email Corporativo</label>
                          <input type="email" value={newColabEmail} onChange={e => setNewColabEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none" placeholder="ana@servicepro.com" />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Telefone / WhatsApp</label>
                          <input type="text" value={newColabPhone} onChange={e => setNewColabPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B8A6] outline-none" placeholder="(11) 99999-9999" />
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
                          <p><strong>Atenção:</strong> Ao salvar, o sistema irá gerar uma Matrícula sequencial e definir a senha inicial como <strong>000</strong>.</p>
                      </div>

                      <div className="flex gap-3 pt-2">
                          <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>
                          <button onClick={handleAddCollaborator} className="flex-1 py-3 bg-[#14B8A6] text-white font-bold rounded-xl hover:bg-[#0d9488] transition-colors shadow-lg">Gerar Acesso</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default EquipeTab;
