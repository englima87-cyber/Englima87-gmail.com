
import React, { useState } from 'react';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import HardHatIcon from '../components/icons/HardHatIcon';
import Logo from '../components/Logo';
import { Role } from '../App';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (role: Role) => void;
  onBackToSite: () => void;
}

// Mock Users Database para Autenticação e Demo
const mockUsers: User[] = [
    { 
        uid: '1', name: 'Admin Geral', email: 'admin@servicepro.com', role: 'manager', active: true, branchId: 'HQ', 
        registrationId: '0001', password: '456', // Senha admin padrão antiga mantida para gerente
        img: 'https://i.pravatar.cc/150?img=33'
    },
    { 
        uid: '2', name: 'Carlos Oliveira (Sênior)', email: 'carlos@servicepro.com', role: 'collaborator', active: true, branchId: 'CENTRO',
        registrationId: '8839', password: '000', // Senha padrão
        img: 'https://i.pravatar.cc/150?img=11'
    },
    { 
        uid: '3', name: 'João Silva (Júnior)', email: 'joao@servicepro.com', role: 'collaborator', active: true, branchId: 'SUL',
        registrationId: '8840', password: '123', // Senha alterada
        img: 'https://i.pravatar.cc/150?img=12'
    },
    { 
        uid: '102', name: 'Mariana Costa (Espec.)', email: 'mariana@servicepro.com', role: 'collaborator', active: true, branchId: 'CENTRO', 
        registrationId: '8802', password: '000', 
        img: 'https://i.pravatar.cc/150?img=5' 
    },
    { 
        uid: '401', name: 'Ricardo Alves (Volante)', email: 'ricardo@servicepro.com', role: 'collaborator', active: true, branchId: 'HQ', 
        registrationId: '8815', password: '000', 
        img: 'https://i.pravatar.cc/150?img=22' 
    }
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBackToSite }) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [identifier, setIdentifier] = useState(''); // Email ou Matrícula
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (role: Role) => {
      if (role === 'viewer') {
          onLogin('viewer'); 
      } else {
          setSelectedRole(role);
          setError('');
          setPassword('');
          setIdentifier('');
      }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Lógica de Autenticação
      const user = mockUsers.find(u => 
          (u.email === identifier || u.registrationId === identifier) && 
          u.role === selectedRole
      );

      if (user) {
          if (user.password === password) {
              if (!user.active) {
                  setError('Usuário inativo. Contate o RH.');
                  return;
              }
              onLogin(selectedRole!);
          } else {
              setError('Senha incorreta.');
          }
      } else {
          // Fallback para a senha global antiga caso o usuário não esteja no mock específico (para facilitar testes)
          if (password === '456' && selectedRole === 'manager') {
               onLogin('manager');
               return;
          }
          setError('Usuário não encontrado ou credenciais inválidas.');
      }
  };

  const availableDemoUsers = mockUsers.filter(u => u.role === selectedRole);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0B4F6C] to-[#021821] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="w-full max-w-md z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 mb-4 rounded-2xl bg-[#14B8A6] flex items-center justify-center shadow-lg transform rotate-3">
                <Logo className="w-12 h-12" color="white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
                Portal <span className="text-[#14B8A6]">Corporativo</span>
            </h1>
            <p className="text-white/50 text-sm mt-2">Acesso restrito a colaboradores autorizados</p>
          </div>

          {!selectedRole ? (
            <div className="space-y-4 animate-fade-in">
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest text-center mb-4">Selecione seu Perfil</p>
              <button
                  onClick={() => handleRoleSelect('manager')}
                  className="w-full flex items-center justify-between bg-[#0B4F6C] text-white font-semibold py-4 px-6 rounded-xl border border-white/10 hover:bg-[#0f5775] hover:border-[#14B8A6]/50 transition-all duration-300 group"
              >
                  <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#14B8A6] transition-colors">
                        <BriefcaseIcon className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Gerência / Admin</span>
                  </div>
                  <span className="text-white/20 group-hover:text-white transition-colors">→</span>
              </button>
              <button
                  onClick={() => handleRoleSelect('collaborator')}
                  className="w-full flex items-center justify-between bg-[#0B4F6C] text-white font-semibold py-4 px-6 rounded-xl border border-white/10 hover:bg-[#0f5775] hover:border-[#14B8A6]/50 transition-all duration-300 group"
              >
                  <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-[#14B8A6] transition-colors">
                        <HardHatIcon className="w-6 h-6" />
                      </div>
                      <span className="text-lg">Colaborador</span>
                  </div>
                  <span className="text-white/20 group-hover:text-white transition-colors">→</span>
              </button>
              
              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                    onClick={() => handleRoleSelect('viewer')}
                    className="w-full text-center text-white/60 text-sm font-medium hover:text-white transition-colors"
                >
                    Modo de Visualização (Sem Edição)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="animate-fade-in space-y-6">
                <button type="button" onClick={() => setSelectedRole(null)} className="text-white/50 hover:text-white flex items-center gap-1 text-sm mb-2">
                    <ChevronLeftIcon className="w-4 h-4" /> Voltar
                </button>
                
                <div className="text-center">
                    <p className="text-white font-bold text-lg">
                        Olá, {selectedRole === 'manager' ? 'Gestor' : 'Colaborador'}
                    </p>
                    <p className="text-white/50 text-sm">Informe suas credenciais</p>
                </div>

                {/* Quick Select Demo Users */}
                {availableDemoUsers.length > 0 && (
                    <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-2 tracking-wider">Acesso Rápido (Demo)</p>
                        <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 pr-1">
                            {availableDemoUsers.map(user => (
                                <button
                                    key={user.uid}
                                    type="button"
                                    onClick={() => {
                                        setIdentifier(user.registrationId || user.email);
                                        setPassword(user.password || '');
                                        setError('');
                                    }}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left group w-full"
                                >
                                    <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full border border-white/30" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white group-hover:text-[#14B8A6] truncate">{user.name}</p>
                                        <p className="text-[10px] text-white/50">Mat: {user.registrationId}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="text-white/60 text-xs font-bold ml-1 mb-1 block">MATRÍCULA OU EMAIL</label>
                        <input 
                            type="text"
                            value={identifier}
                            onChange={(e) => {setIdentifier(e.target.value); setError('')}}
                            className="w-full px-4 py-3 bg-[#0B4F6C]/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-none placeholder-white/20 transition-all"
                            placeholder="Ex: 8839 ou nome@email.com"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="text-white/60 text-xs font-bold ml-1 mb-1 block">SENHA</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setError('')}}
                            className="w-full px-4 py-3 bg-[#0B4F6C]/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-none placeholder-white/20 transition-all"
                            placeholder="••••••"
                        />
                    </div>
                    {error && <p className="text-red-400 text-xs text-center font-bold bg-red-900/20 py-2 rounded border border-red-900/30">{error}</p>}
                </div>

                <button type="submit" className="w-full bg-[#14B8A6] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#0d9488] transition-all transform hover:scale-[1.02]">
                    Acessar Sistema
                </button>
                
                {selectedRole === 'collaborator' && (
                    <p className="text-center text-xs text-white/30">
                        Primeiro acesso? Sua senha inicial é <strong>000</strong>
                    </p>
                )}
            </form>
          )}
      </div>

      <button onClick={onBackToSite} className="mt-8 text-white/40 text-sm hover:text-white transition-colors flex items-center gap-2 z-10">
          <ChevronLeftIcon className="w-4 h-4" /> Voltar ao Site Público
      </button>
    </div>
  );
};

export default LoginScreen;
