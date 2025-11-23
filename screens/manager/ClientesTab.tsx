
import React, { useState } from 'react';
import SearchIcon from '../../components/icons/SearchIcon';
import PlusIcon from '../../components/icons/PlusIcon';
import { Client } from '../../types';
import ChevronDownIcon from '../../components/icons/ChevronDownIcon';

const Toggle: React.FC = () => {
    const [isContracts, setIsContracts] = useState(false);
    return (
        <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${!isContracts ? 'text-teal-600' : 'text-gray-500'}`}>Clientes</span>
            <button onClick={() => setIsContracts(!isContracts)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isContracts ? 'bg-teal-500' : 'bg-gray-300'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isContracts ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-semibold ${isContracts ? 'text-teal-600' : 'text-gray-500'}`}>Contratos</span>
        </div>
    );
};

const clients: Client[] = [
    { name: 'Maria Oliveira', id: '007155 4502519', img: 'https://i.pravatar.cc/150?img=21', active: true, branch: 'FILIAL CENTRO', contractStatus: 'ativo' },
    { name: 'Empresa ABC Ltda', id: '007155 4502519', img: 'https://i.pravatar.cc/150?img=22', active: true, branch: 'FILIAL CENTRO', contractStatus: 'ativo' },
    { name: 'Lloria Oniss', id: 'A84822 925061846', img: 'https://i.pravatar.cc/150?img=23', active: true, branch: 'FILIAL ZONA SUL', contractStatus: 'pendente' },
    { name: 'Empris ABC Ltda', id: '007155 4502519', img: 'https://i.pravatar.cc/150?img=24', active: true, branch: 'FILIAL CENTRO', contractStatus: 'inativo' },
];

const ClientList: React.FC<{ onSelectClient: (client: Client) => void, readOnly: boolean }> = ({ onSelectClient, readOnly }) => {
    const Component = readOnly ? 'div' : 'button';
    return (
        <div className="space-y-3">
            {clients.map(client => (
                <Component key={client.id + client.name} onClick={() => !readOnly && onSelectClient(client)} className={`w-full text-left bg-white p-3 rounded-xl shadow-md flex items-center justify-between ${!readOnly ? 'hover:bg-gray-50 transition-colors' : 'cursor-default'}`}>
                    <div className="flex items-center space-x-4">
                        <img src={client.img} alt={client.name} className="w-12 h-12 rounded-full"/>
                        <div>
                            <p className="font-bold text-gray-800">{client.name}</p>
                            <p className="text-xs text-gray-500">{client.id}</p>
                        </div>
                    </div>
                     <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-100 text-teal-700">
                        {client.branch}
                    </span>
                </Component>
            ))}
        </div>
    );
};

interface ClientesTabProps {
    onSelectClient: (client: Client) => void;
    readOnly?: boolean;
}

const ClientesTab: React.FC<ClientesTabProps> = ({ onSelectClient, readOnly = false }) => {
  return (
    <div className="relative pb-16">
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Gestão de Clientes e Contratos</h2>
                <button className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    <span>Filial Centro</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </button>
            </div>
            <Toggle />
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Buscar cliente..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500"/>
            </div>
        </div>
        <ClientList onSelectClient={onSelectClient} readOnly={readOnly} />
        {!readOnly && (
            <button className="absolute -bottom-4 right-0 w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-110">
                <PlusIcon className="w-8 h-8"/>
            </button>
        )}
    </div>
  );
};

export default ClientesTab;