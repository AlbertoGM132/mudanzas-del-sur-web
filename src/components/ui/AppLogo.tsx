'use client';

import React, { memo } from 'react';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({ src = '/assets/images/app_logo.png', size = 64, className = '', onClick }: AppLogoProps) {
  return (
    <div className={`flex items-center ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`} onClick={onClick}>
      <AppImage src={src} alt="Logo" width={size} height={size} className="flex-shrink-0" priority />
    </div>
  );
});

export default AppLogo;
