
import React from 'react';

const Logo: React.FC<{ className?: string; color?: string }> = ({ className, color }) => {
  // ServicePro Brand Palette
  const navy = '#0B4F6C';
  const turquoise = '#14B8A6';
  const lightGray = '#F3F4F6';

  // If a specific color override is provided (e.g., 'white'), use it for all main elements.
  // Otherwise, use the multi-color brand palette.
  const primaryColor = color || navy;
  const secondaryColor = color || turquoise;
  const tertiaryColor = color ? 'currentColor' : lightGray; // Use current text color or gray for details

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gear/Wrench Shape (Navy) - Represents Service & Management */}
        <path
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Snowflake Center (Turquoise) - Represents Climate/Cooling */}
        <g transform="translate(12 12)">
            <path d="M0 -4 V4" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M0 0 L3.5 3.5" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M0 0 L-3.5 -3.5" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M0 0 L3.5 -3.5" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M0 0 L-3.5 3.5" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M-4 0 H4" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Upward Arrow/Indicator (Light Gray or Accent) - Represents Pro/Growth */}
        {!color && (
            <circle cx="18" cy="6" r="2" fill={secondaryColor} opacity="0.8" />
        )}
      </svg>
    </div>
  );
};

export default Logo;
