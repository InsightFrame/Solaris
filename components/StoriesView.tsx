import React from 'react';
import { User } from '../types';
import { Zap } from 'lucide-react';

interface StoriesViewProps {
  users: User[];
}

const StoryCard: React.FC<{ user: User; index: number }> = ({ user, index }) => (
  <div className="relative h-64 rounded-[32px] overflow-hidden group cursor-pointer border border-white/5 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
    {/* Background Image (Blurred) */}
    <div className="absolute inset-0">
        <img src={user.avatar} className="w-full h-full object-cover opacity-40 blur-xl scale-125" />
        <div className="absolute inset-0 bg-night/30"></div>
    </div>

    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
        
        {/* Large Animated Wave Avatar */}
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
             {/* Wave Spectrum Layers */}
            <div className="absolute inset-[-4px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-cyan-400 animate-wave-slow opacity-80 blur-[2px] rounded-[40%]"></div>
            <div className="absolute inset-[-1.5px] bg-gradient-to-bl from-cyan-400 via-yellow-200 to-yellow-500 animate-wave-fast opacity-90 rounded-[40%]"></div>
            
            {/* Avatar Image */}
            <div className="relative w-full h-full rounded-[40%] overflow-hidden border-2 border-night bg-night p-[3px]">
                <img src={user.avatar} className="w-full h-full object-cover rounded-[35%]" />
            </div>
            
            {/* Live Indicator */}
            {index % 2 === 0 && (
                <div className="absolute bottom-0 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border-2 border-night shadow-lg animate-pulse">
                    LIVE
                </div>
            )}
        </div>

        <h3 className="text-white font-bold text-lg tracking-wide shadow-black drop-shadow-md">{user.username}</h3>
        <p className="text-cyan-300 text-xs font-medium uppercase tracking-widest mt-1 opacity-80">
            {index % 2 === 0 ? 'Ao Vivo Agora' : 'Novo Story'}
        </p>
    </div>
  </div>
);

const StoriesView: React.FC<StoriesViewProps> = ({ users }) => {
  return (
    <div className="pb-36 pt-14 px-5 h-full relative">
        <div className="mb-6 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full text-night shadow-[0_0_20px_rgba(255,165,0,0.4)]">
                <Zap size={24} fill="currentColor" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Stories</h1>
                <p className="text-gray-400 text-sm">Momentos em tempo real</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Add 'My Story' Card first */}
             <div className="relative h-64 rounded-[32px] overflow-hidden group cursor-pointer border-2 border-dashed border-white/10 flex flex-col items-center justify-center hover:bg-white/5 transition-colors">
                 <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-yellow-400 group-hover:text-night transition-colors text-white">
                     <Zap size={28} />
                 </div>
                 <span className="text-sm font-bold text-white">Criar Story</span>
             </div>

            {users.map((user, idx) => (
                <StoryCard key={user.id} user={user} index={idx} />
            ))}
             {/* Duplicate users to fill grid for demo */}
             {users.map((user, idx) => (
                <StoryCard key={`dup_${user.id}`} user={user} index={idx + 4} />
            ))}
        </div>
    </div>
  );
};

export default StoriesView;