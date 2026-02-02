import React, { useState, useEffect } from 'react';
import { Home, Aperture, Plus, MessageSquare, User, Zap } from 'lucide-react';
import AuthView from './components/AuthView';
import FeedView from './components/FeedView';
import ProfileView from './components/ProfileView';
import MessagesView from './components/MessagesView';
import StoriesView from './components/StoriesView';
import { ViewState, User as UserType, Post, ChatSession } from './types';
import { CURRENT_USER, MOCK_USERS, MOCK_POSTS, INITIAL_CHATS } from './constants';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.FEED);
  const [currentUser, setCurrentUser] = useState<UserType>(CURRENT_USER);
  const [loadingInitial, setLoadingInitial] = useState(true);
  
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_CHATS);

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (profile) {
            setCurrentUser({
                id: session.user.id,
                username: profile.username || 'user',
                name: profile.full_name || 'User',
                avatar: profile.avatar_url || 'https://picsum.photos/200/200',
                posts: 0, 
                followers: 0, 
                following: 0, 
                bio: profile.bio || '',
                isVerified: profile.is_verified || false // Mapped from Supabase
            });
        }
        loadData();
      }
      setLoadingInitial(false);
    };
    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadData = async () => {
      try {
          const { data: realPosts } = await supabase.from('posts').select(`*, user:profiles(*)`).order('created_at', { ascending: false });
          if (realPosts && realPosts.length > 0) {
              const formattedPosts: Post[] = realPosts.map((p: any) => ({
                  id: p.id,
                  user: {
                      id: p.user?.id || 'unknown',
                      username: p.user?.username || 'unknown',
                      name: p.user?.full_name || 'Unknown',
                      avatar: p.user?.avatar_url || 'https://picsum.photos/200',
                      posts: 0, followers: 0, following: 0,
                      isVerified: p.user?.is_verified || false
                  },
                  image: p.image_url,
                  caption: p.caption,
                  likes: p.likes_count || 0,
                  comments: [],
                  likedByMe: false,
                  timestamp: new Date(p.created_at).toLocaleDateString(),
                  location: p.location
              }));
              setPosts(formattedPosts);
          }
      } catch (e) {
          console.log("Using mock data");
      }
  };

  const handleAuth = async (email: string, pass: string, name: string, isRegister: boolean) => {
      try {
          if (isRegister) {
              const { error } = await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } });
              if (error) throw error;
              alert("Registro realizado! Entre agora.");
          } else {
              const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
              if (error) throw error;
          }
      } catch (error: any) {
          alert(`Erro: ${error.message}`);
          if (error.message.includes('fetch') || error.message.includes('apikey')) {
               console.warn("Backend unreachable. Entering Demo Mode.");
               setIsAuthenticated(true);
          }
      }
  };
  
  const handleToggleLike = async (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likedByMe: !post.likedByMe, likes: post.likedByMe ? post.likes - 1 : post.likes + 1 } 
        : post
    ));
  };

  const handleMessageInteraction = (sessionId: string, text: string) => {
      setSessions(prev => prev.map(session => {
        if (session.id === sessionId) {
            return {
                ...session,
                messages: [...session.messages, { id: Date.now().toString(), senderId: 'me', text, timestamp: new Date(), isMe: true }],
                lastMessage: text, unreadCount: 0
            };
        }
        return session;
    }));
  };

  if (loadingInitial) return <div className="min-h-screen bg-night flex items-center justify-center"><div className="w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div></div>;
  if (!isAuthenticated) return <AuthView onAuth={handleAuth} />;

  const NavItem = ({ icon: Icon, active, onClick, main = false }: any) => (
      <button 
        onClick={onClick}
        className={`relative flex items-center justify-center transition-all duration-300 ${
            main 
            ? 'w-16 h-16 bg-gradient-to-tr from-yellow-500 to-cyan-400 rounded-full shadow-[0_0_25px_rgba(255,215,0,0.6)] -translate-y-6 hover:scale-110 active:scale-95 text-night border-4 border-night z-20' 
            : `w-12 h-12 rounded-2xl hover:bg-white/10 ${active ? 'text-yellow-400 bg-white/5' : 'text-gray-400'}`
        }`}
      >
          <Icon size={main ? 28 : 24} strokeWidth={active ? 2.5 : 2} />
          {active && !main && <div className="absolute -bottom-1.5 w-1 h-1 bg-yellow-400 rounded-full box-content border-2 border-night"></div>}
      </button>
  );

  return (
    // Updated Container Logic for "Organized Screen"
    // Thicker border, rounder corners, consistent sizing on desktop.
    <div className="w-full h-[100dvh] md:h-[880px] md:max-w-[414px] md:rounded-[55px] md:border-[14px] md:border-[#121212] md:shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-night relative overflow-hidden flex flex-col ring-1 ring-white/10 font-sans">
      
      {/* Top Status Bar Spacer (Visual only) */}
      <div className="w-full h-1 absolute top-0 left-0 z-50 flex justify-center">
         <div className="w-32 h-6 bg-black/80 rounded-b-2xl backdrop-blur-md"></div>
      </div>

      <main className="flex-1 overflow-y-auto scroll-smooth hide-scrollbar relative">
        {currentView === ViewState.FEED && <FeedView posts={posts} users={MOCK_USERS} onToggleLike={handleToggleLike} />}
        {currentView === ViewState.STORIES && <StoriesView users={MOCK_USERS} />}
        {currentView === ViewState.PROFILE && <ProfileView user={currentUser} posts={posts.filter(p => p.user.id === 'me' || p.likedByMe)} />}
        {currentView === ViewState.MESSAGES && <MessagesView sessions={sessions} onSendMessage={handleMessageInteraction} onBack={() => setCurrentView(ViewState.FEED)} />}
        {currentView === ViewState.ADD_POST && <div className="h-full flex flex-col items-center justify-center text-gray-500"><Plus className="mb-4 text-yellow-400" size={48} /> <p>Create Mode Coming Soon</p></div>}
      </main>

      {/* Floating Glass Dock Navigation - Cleaned up */}
      {currentView !== ViewState.MESSAGES && (
        <div className="absolute bottom-8 w-full px-6 z-50 pointer-events-none flex justify-center">
            <div className="glass-dock pointer-events-auto w-full max-w-[360px] rounded-3xl h-20 px-6 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-night/80 border-white/5">
                <NavItem icon={Home} active={currentView === ViewState.FEED} onClick={() => setCurrentView(ViewState.FEED)} />
                <NavItem icon={Aperture} active={currentView === ViewState.STORIES} onClick={() => setCurrentView(ViewState.STORIES)} />
                <NavItem icon={Plus} main onClick={() => setCurrentView(ViewState.ADD_POST)} />
                <NavItem icon={MessageSquare} active={currentView === ViewState.MESSAGES} onClick={() => setCurrentView(ViewState.MESSAGES)} />
                <NavItem icon={User} active={currentView === ViewState.PROFILE} onClick={() => setCurrentView(ViewState.PROFILE)} />
            </div>
        </div>
      )}
    </div>
  );
};

export default App;