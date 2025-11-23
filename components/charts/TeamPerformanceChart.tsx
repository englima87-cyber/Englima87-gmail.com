
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TeamPerformanceData, ServiceTypeData } from '../../types';

const teamData: TeamPerformanceData[] = [
  { name: 'Técnica', performance: 10 },
  { name: 'Teicira', performance: 7 },
  { name: 'Epeat', performance: 5 },
  { name: 'Deimba', performance: 1 },
];

const serviceData: ServiceTypeData[] = [
    { name: 'Preventiva', value: 45, color: '#60A5FA' },
    { name: 'Corretiva', value: 30, color: '#1E3A8A' },
    { name: 'Instalação', value: 25, color: '#14B8A6' },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent } : any) => {
    return (
        <text x={cx} y={cy} fill="white" textAnchor="middle" dominantBaseline="central" >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const TeamPerformanceChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Performance da Equipe</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teamData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip cursor={{fill: 'transparent'}}/>
              <Bar dataKey="performance" barSize={15} radius={[0, 10, 10, 0]}>
                {teamData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#14B8A6' : '#1E3A8A'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformanceChart;
