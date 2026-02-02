import React from 'react';

export const GradientButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, fullWidth, className = '', disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      ${fullWidth ? 'w-full' : ''}
      relative overflow-hidden
      bg-gradient-to-r from-yellow-500 via-yellow-400 to-cyan-400
      text-night font-bold py-4 px-8 rounded-2xl
      shadow-[0_0_20px_rgba(255,215,0,0.3)]
      transform transition-all duration-300
      active:scale-95 hover:shadow-[0_0_30px_rgba(64,224,208,0.4)] hover:-translate-y-1
      disabled:opacity-50 disabled:cursor-not-allowed
      border border-white/10
      ${className}
    `}
  >
    <div className="absolute inset-0 bg-white/30 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    <span className="relative z-10">{children}</span>
  </button>
);

export const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}> = ({ type, placeholder, value, onChange, icon }) => (
  <div className="relative w-full mb-5 group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yellow-400 transition-colors">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-white/5 text-white border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all placeholder-gray-500 backdrop-blur-sm focus:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
    />
  </div>
);

export const Avatar: React.FC<{ src: string; size?: 'sm' | 'md' | 'lg' | 'xl'; border?: boolean }> = ({ src, size = 'md', border = false }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`relative ${border ? 'p-[3px] bg-gradient-to-tr from-yellow-400 via-cyan-400 to-yellow-500 rounded-full shadow-lg shadow-cyan-500/20' : ''}`}>
      <img
        src={src}
        alt="Avatar"
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-night`}
      />
    </div>
  );
};