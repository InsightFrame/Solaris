import React from 'react';
import { Heart, MessageCircle, MoreVertical, Share2 } from 'lucide-react';
import { Post, User } from '../types';
import { Avatar } from './Shared';

interface FeedViewProps {
  posts: Post[];
  users: User[];
  onToggleLike: (postId: string) => void;
}

const PostCard: React.FC<{ post: Post; onToggleLike: () => void }> = ({ post, onToggleLike }) => {
  return (
    <div className="w-full relative group">
        {/* Image Container - Aspect 4:5 for standard immersive feed look */}
        <div className="relative rounded-[32px] overflow-hidden glass-panel shadow-2xl border-white/5 aspect-[4/5]">
            <img 
                src={post.image} 
                alt="Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
            />
            
            {/* Overlay Gradient - Darker at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent opacity-80"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <Avatar src={post.user.avatar} size="sm" border />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white tracking-wide shadow-black drop-shadow-md">{post.user.username}</span>
                            {post.location && <span className="text-[10px] text-gray-300 font-light">{post.location}</span>}
                        </div>
                    </div>
                    <button className="text-white/70 hover:text-white">
                        <MoreVertical size={20} />
                    </button>
                </div>
                
                {post.caption && (
                    <p className="text-sm text-gray-100 line-clamp-2 leading-relaxed font-normal mb-4 drop-shadow-sm">
                        {post.caption}
                    </p>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex gap-4">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onToggleLike(); }}
                            className={`flex items-center gap-2 transition-all ${post.likedByMe ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
                        >
                            <Heart size={24} fill={post.likedByMe ? "currentColor" : "none"} className={post.likedByMe ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""} />
                            {post.likedByMe && <span className="text-xs font-bold">{post.likes}</span>}
                        </button>
                        <button className="text-white hover:text-cyan-400 transition-colors">
                            <MessageCircle size={24} />
                        </button>
                        <button className="text-white hover:text-cyan-400 transition-colors">
                            <Share2 size={24} />
                        </button>
                    </div>
                     <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{post.timestamp} ATRÁS</span>
                </div>
            </div>
        </div>
    </div>
  );
};

const FeedView: React.FC<FeedViewProps> = ({ posts, users, onToggleLike }) => {
  return (
    <div className="pb-36 pt-14 px-0">
        {/* Header Branding */}
        <div className="px-6 mb-6 flex justify-between items-center sticky top-0 z-20 mix-blend-difference">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white tracking-tight">Solaris<span className="text-yellow-400">.</span> Feed</h1>
            </div>
            <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                <MoreVertical size={20} className="text-cyan-400" />
            </div>
        </div>

      {/* Vertical Feed Layout */}
      <div className="flex flex-col gap-8 px-4 pb-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onToggleLike={() => onToggleLike(post.id)} />
        ))}
      </div>
    </div>
  );
};

export default FeedView;