
import React, { useState } from 'react';
import PlusIcon from '../../components/icons/PlusIcon';
import { User } from '../../types';

// Mock Data atualizado com Certificações e BranchID
const users: User[] = [
    { 
        uid: '1', 
        name: 'Carlos Oliveira', 
        role: 'manager', 
        details: 'carlos.oliveira@servicepro.com', 
        img: 'https://i.pravatar.cc/150?img=31', 
        active: true, 
        email: 'carlos.oliveira@servicepro.com', 
        branchId: 'CENTRO' 
    },
    { 
        uid: '2', 
        name: 'João Silva', 
        role: 'collaborator', 
        details: 'Técnico de Campo', 
        img: 'https://i.pravatar.cc/150?img=32', 
        active: true, 
        email: 'joao.silva@servicepro.com', 
        branchId: 'CENTRO',
        certifications: {
            nr35_expiry: '2025-12-01', // Em dia
            nr10_expiry: '2023-10-01'  // Vencido
        }
    },
    { 
        uid: '3', 
        name: 'Roberto Mendes', 
        role: 'manager', 
        details: 'Diretor Operacional', 
        img: 'https://i.pravatar.cc/150?img=33', 
        active: false, 
        email: 'roberto@servicepro.com', 
        branchId: 'SUL' 
    },
    { 
        uid: '4', 
        name: 'Ana Souza', 
        role: 'manager', 
        details: 'Administrativo', 
        img: 'https://i.pravatar.cc/150?img=34', 
        active: true, 
        email: 'ana@servicepro.com', 
        branchId: 'CENTRO' 
    },
];

const UserCard: React.FC<{ user: User, readOnly: boolean }> = ({ user, readOnly }) => {
    const [isActive, setIsActive] = useState(user.active);

    // Verificação de certificação vencida (apenas para colaboradores)
    const hasExpiredCert = user.certifications && (
        new Date(user.certifications.nr10_expiry || '') < new Date() || 
        new Date(user.certifications.nr35_expiry || '') < new Date()
    );

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img src={user.img} alt={user.name} className={`w-12 h-12 rounded-full border-2 ${isActive ? 'border-green-400' : 'border-gray-200 grayscale'}`} />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800">{user.name}</p>
                        {user.role === 'collaborator' && hasExpiredCert && (
                            <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                                Certificação Vencida
                            </span>
                        )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${user.role === 'manager' ? 'bg-blue-100 text-blue-700' : user.role === 'collaborator' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}>
                        {user.role === 'manager' ? 'Gerência/Admin' : user.role === 'collaborator' ? 'Colaborador' : 'Outro'}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{user.details || user.email}</p>
                </div>
            </div>
            <button 
                onClick={() => !readOnly && setIsActive(!isActive)} 
                disabled={readOnly}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${isActive ? 'bg-[#14B8A6]' : 'bg-gray-300'} ${readOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
            >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full shadow-sm transition-transform duration-300 ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    )
}

const AdminTab: React.FC<{ readOnly?: boolean }> = ({ readOnly = false }) => {
    const [activeTab, setActiveTab] = useState<'Usuários Ativos' | 'Perfis'>('Usuários Ativos');
    return (
        <div className="relative pb-20">
            <div className="bg-white p-4 rounded-xl shadow-md mb-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Controle de Acesso & RH</h2>
                <div className="flex p-1 bg-gray-100 rounded-lg">
                    <button onClick={() => setActiveTab('Usuários Ativos')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'Usuários Ativos' ? 'bg-white text-[#0B4F6C] shadow-sm' : 'text-gray-500'}`}>Usuários</button>
                    <button onClick={() => setActiveTab('Perfis')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'Perfis' ? 'bg-white text-[#0B4F6C] shadow-sm' : 'text-gray-500'}`}>Cargos & Permissões</button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-gray-600 text-sm uppercase tracking-wide ml-2">Membros da Equipe</h3>
                {users.map((user) => <UserCard key={user.uid} user={user} readOnly={readOnly} />)}
            </div>

            {!readOnly && (
                <button className="absolute -bottom-4 right-0 w-16 h-16 bg-[#0B4F6C] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#093e54] transition-transform hover:scale-110 z-10">
                    <PlusIcon className="w-8 h-8" />
                </button>
            )}
        </div>
    );
};

export default AdminTab;
