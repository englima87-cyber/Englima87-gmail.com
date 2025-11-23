
import React from 'react';

interface ProfileTabProps {
    onLogout: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onLogout }) => {
    return (
        <div className="p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Perfil</h2>
            
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
            <p className="font-bold text-lg">Nome do Cliente</p>
            <p className="text-gray-500">cliente@email.com</p>

            <button 
                onClick={onLogout}
                className="mt-12 bg-red-500 text-white font-semibold py-2 px-8 rounded-lg"
            >
                Sair
            </button>
        </div>
    );
};

export default ProfileTab;
