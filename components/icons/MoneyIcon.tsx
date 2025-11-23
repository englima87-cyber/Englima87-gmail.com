
import React from 'react';

const MoneyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.5M12 9.5v-1.5M7.5 14.5v-1.5M16.5 9.5v-1.5M12 12.5v-1.5m-4.5 5.5v-1.5m9-3.5v-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5A6.5 6.5 0 1118.5 12 6.507 6.507 0 0112 18.5z" />
    </svg>
);

export default MoneyIcon;
