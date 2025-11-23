
import React from 'react';
const HardHatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 13a8 8 0 0 1 16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13V9.5A2.5 2.5 0 0 1 11.5 7h1A2.5 2.5 0 0 1 15 9.5V13" />
  </svg>
);
export default HardHatIcon;
