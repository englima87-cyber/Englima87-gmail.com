
import React from 'react';
import HomeIcon from '../../components/icons/HomeIcon';
import MapPinIcon from '../../components/icons/MapPinIcon';

const TrackServiceScreen: React.FC = () => {
    return (
        <div className="bg-gray-100">
            <div className="bg-white p-4 m-4 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-800">Serviço #4529 - Manutenção Corretiva</h3>
                <div className="mt-2 inline-flex items-center space-x-2 bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                   <HomeIcon className="w-4 h-4" />
                   <span>Status: A Caminho</span>
                </div>
            </div>

            <div className="px-4 -mt-2">
                <div className="relative h-64 bg-gray-300 rounded-xl overflow-hidden shadow-lg">
                    {/* Placeholder for Map */}
                    <img src="https://i.imgur.com/8O5VbFf.png" className="w-full h-full object-cover" alt="Map view of technician route" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                           <img src="https://i.pravatar.cc/150?img=13" className="w-10 h-10 rounded-full border-2 border-white shadow-md"/>
                           <MapPinIcon className="absolute -bottom-8 -left-3 w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                     <HomeIcon className="absolute bottom-8 right-1/2 translate-x-[80px] w-8 h-8 text-green-600" />

                </div>
            </div>

            <div className="bg-white p-4 m-4 rounded-xl shadow-md flex items-center space-x-4">
                 <img src="https://i.pravatar.cc/150?img=13" alt="Carlos Oliveira" className="w-16 h-16 rounded-full border-4 border-green-400"/>
                 <div>
                    <h3 className="font-bold text-xl text-gray-800">Carlos Oliveira</h3>
                    <p className="text-gray-600">Seu técnico está a caminho!</p>
                 </div>
            </div>

            <div className="px-4 grid grid-cols-2 gap-4">
                <button className="w-full bg-green-500 text-white font-bold py-3 rounded-lg">Ligar para o Técnico</button>
                <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg">Ver Detalhes do Serviço</button>
            </div>
        </div>
    );
};

export default TrackServiceScreen;
