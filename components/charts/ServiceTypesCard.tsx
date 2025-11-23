
import React from 'react';
import { ServiceTypeData } from '../../types';

const serviceData: ServiceTypeData[] = [
  { name: 'Preventiva', value: 45, color: '#60A5FA' },
  { name: 'Corretiva', value: 30, color: '#1E3A8A' },
  { name: 'Instalação', value: 25, color: '#14B8A6' },
  // Adding another for layout purposes
  { name: 'Preventiva', value: 0, color: '#60A5FA' }, // This seems to be a duplicate in the image, replicating it.
];


const LegendItem: React.FC<{ color: string; name: string; percentage: number }> = ({ color, name, percentage }) => (
    <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }}></div>
        <span className="text-sm text-gray-600">{name} ({percentage > 0 ? `${percentage}%` : ''})</span>
    </div>
);

const ServiceTypesCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Serviços Solicitados</h2>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {serviceData.map((item, index) => (
            <LegendItem key={index} color={item.color} name={item.name} percentage={item.value} />
        ))}
      </div>
    </div>
  );
};

export default ServiceTypesCard;
