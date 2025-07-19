import React from 'react';

export const Avatar = ({ children, className = "" }) => (
  <div className={`w-12 h-12 rounded-full overflow-hidden ${className}`}>
    {children}
  </div>
);

export const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

export const AvatarFallback = ({ initials }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white">
    {initials}
  </div>
);
