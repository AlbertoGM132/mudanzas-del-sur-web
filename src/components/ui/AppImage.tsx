'use client';

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
  [key: string]: any;
}

const AppImage = memo(function AppImage({
  src, alt, width, height, className = '', priority = false, quality = 85,
  fill = false, sizes, onClick, ...props
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = useCallback(() => {
    setImageSrc('/assets/images/no_image.png');
  }, []);

  const commonProps = {
    src: imageSrc,
    alt,
    className,
    quality,
    unoptimized: true,
    onError: handleError,
    onClick,
    ...(priority ? { priority: true } : { loading: 'lazy' as const }),
  };

  if (fill) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image {...commonProps} fill sizes={sizes || '100vw'} style={{ objectFit: 'cover' }} {...props} />
      </div>
    );
  }

  return <Image {...commonProps} width={width || 400} height={height || 300} sizes={sizes} {...props} />;
});

AppImage.displayName = 'AppImage';
export default AppImage;
