import React from 'react';
import { Grid, Tag, Settings, MapPin, BadgeCheck } from 'lucide-react';
import { User, Post } from '../types';
import { Avatar, GradientButton } from './Shared';

interface ProfileViewProps {
  user: User;
  posts: Post[];
}

const StatItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-2 min-w-[60px]">
        <span className="text-lg font-bold text-white mb-0.5">{value}</span>
        <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-medium">{label}</span>
    </div>
);

const ProfileView: React.FC<ProfileViewProps> = ({ user, posts }) => {
  const myPosts = [...posts, ...posts, ...posts].map((p, i) => ({...p, id: `mp_${i}`}));

  return (
    <div className="min-h-full bg-night pb-36 pt-12 relative overflow-hidden flex flex-col">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-yellow-600/20 via-cyan-900/10 to-transparent pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 px-6 py-4 flex justify-between items-center">
            <span className="text-sm font-bold tracking-wide text-white flex items-center gap-1">
                @{user.username}
                {user.isVerified && <BadgeCheck size={14} className="text-cyan-400 fill-cyan-400/20" />}
            </span>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Settings className="text-white" size={20} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
            {/* Floating ID Card */}
            <div className="mx-5 mt-2 mb-8">
                <div className="glass-panel rounded-[32px] p-6 flex flex-col items-center text-center shadow-2xl backdrop-blur-xl relative overflow-hidden border border-white/10">
                    <div className="mb-4 relative">
                         <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30"></div>
                        <Avatar src={user.avatar} size="xl" border />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                        {user.name}
                        {user.isVerified && (
                            <BadgeCheck size={24} className="text-cyan-400" fill="rgba(6,182,212, 0.2)" />
                        )}
                    </h1>
                    <div className="flex items-center gap-1.5 text-xs text-cyan-300 mb-4 bg-cyan-900/30 border border-cyan-500/30 px-3 py-1 rounded-full">
                        <MapPin size={10} /> Rio de Janeiro, BR
                    </div>
                    
                    <p className="text-sm text-gray-300 leading-relaxed max-w-[240px] mx-auto font-light mb-6">
                        {user.bio}
                    </p>

                    <div className="flex justify-between w-full px-2 pt-6 border-t border-white/5 gap-4">
                        <StatItem value={user.posts} label="Posts" />
                        <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent h-10 self-center"></div>
                        <StatItem value={user.followers} label="Fãs" />
                        <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent h-10 self-center"></div>
                        <StatItem value={user.following} label="Seguindo" />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 mb-8">
                <GradientButton className="flex-1 py-3 text-sm rounded-xl font-semibold shadow-none text-night" onClick={() => {}}>
                    Editar Perfil
                </GradientButton>
                <button className="flex-1 py-3 text-sm rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                    Compartilhar
                </button>
            </div>

            {/* Content Tabs */}
            <div className="px-2">
                <div className="flex justify-center gap-12 mb-4 border-b border-white/5 pb-1">
                    <button className="text-white border-b-2 border-yellow-400 pb-3 px-2 transition-colors flex items-center gap-2 text-sm font-medium">
                        <Grid size={16} className="text-yellow-400" /> Grid
                    </button>
                    <button className="text-gray-600 hover:text-gray-400 transition-colors pb-3 px-2 flex items-center gap-2 text-sm font-medium">
                        <Tag size={16} /> Marcado
                    </button>
                </div>

                {/* Clean Grid */}
                <div className="grid grid-cols-3 gap-0.5 pb-8">
                    {myPosts.map((post) => (
                        <div key={post.id} className="aspect-square relative group overflow-hidden bg-white/5 cursor-pointer">
                            <img src={post.image} alt="Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfileView;