import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, MoreHorizontal, Phone, Video } from 'lucide-react';
import { ChatSession, Message } from '../types';
import { Avatar } from './Shared';
import { generateAIResponse } from '../services/geminiService';

interface MessagesViewProps {
  sessions: ChatSession[];
  onSendMessage: (sessionId: string, text: string) => void;
  onBack: () => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({ sessions, onSendMessage, onBack }) => {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const activeSession = sessions.find(s => s.id === activeSessionId);

  if (activeSession) {
    return (
      <ChatWindow 
        session={activeSession} 
        onBack={() => setActiveSessionId(null)}
        onSend={(text) => onSendMessage(activeSession.id, text)}
      />
    );
  }

  return (
    <div className="pb-36 pt-14 px-5 h-full bg-night text-white overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button 
                onClick={onBack}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
          </div>
          <button className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10">
             <MoreHorizontal size={20} />
          </button>
      </div>
      
      <div className="space-y-4">
        {/* Search Bar Placeholder */}
        <div className="w-full h-10 bg-white/5 rounded-xl border border-white/5 mb-6 flex items-center px-4 text-sm text-gray-500 focus-within:border-yellow-400/50 transition-colors">
            Buscar conversa...
        </div>

        {sessions.map((session) => (
          <div 
            key={session.id} 
            onClick={() => setActiveSessionId(session.id)}
            className="group flex items-center justify-between p-4 rounded-2xl bg-transparent hover:bg-white/5 transition-all cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="relative">
                <Avatar src={session.user.avatar} size="md" />
                {session.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center text-[10px] text-night font-bold shadow-md ring-2 ring-night">
                        {session.unreadCount}
                    </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">{session.user.name}</h3>
                    <span className="text-[10px] text-gray-600 font-mono">12:30</span>
                </div>
                <p className={`text-sm ${session.unreadCount > 0 ? 'text-gray-200 font-medium' : 'text-gray-500'} truncate font-light`}>
                    {session.messages[session.messages.length - 1]?.text || session.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatWindow: React.FC<{ session: ChatSession; onBack: () => void; onSend: (text: string) => void }> = ({ session, onBack, onSend }) => {
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [session.messages, isTyping]);

    const handleSend = async () => {
        if (!inputText.trim()) return;
        const text = inputText;
        setInputText('');
        onSend(text);

        if (session.user.username === 'solaris.ai') {
            setIsTyping(true);
            const response = await generateAIResponse(text);
            setIsTyping(false);
            onSend(response);
        }
    };

    return (
        <div className="flex flex-col h-full bg-night text-white relative">
            {/* Header - Stays at top */}
            <div className="px-4 py-3 glass-panel border-b border-white/5 flex items-center gap-3 z-50 sticky top-0 pt-12">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors -ml-2">
                    <ArrowLeft size={22} />
                </button>
                <Avatar src={session.user.avatar} size="sm" />
                <div className="flex-1">
                    <h3 className="font-bold text-sm leading-tight">{session.user.name}</h3>
                    <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider block">Online</span>
                </div>
                <div className="flex gap-2 text-gray-400">
                    <Phone size={20} className="hover:text-white cursor-pointer" />
                    <Video size={20} className="hover:text-white cursor-pointer" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center text-[10px] text-gray-600 my-4 uppercase tracking-widest">Hoje</div>
                {session.messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                         {!msg.isMe && <div className="mr-2 self-end mb-1"><Avatar src={session.user.avatar} size="sm" /></div>}
                         <div className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                             msg.isMe 
                             ? 'bg-gradient-to-br from-yellow-500 to-cyan-500 text-night font-medium rounded-tr-none' 
                             : 'bg-white/10 text-gray-200 rounded-tl-none'
                         }`}>
                             {msg.text}
                         </div>
                    </div>
                ))}
                 {isTyping && (
                    <div className="flex justify-start items-end gap-2">
                        <Avatar src={session.user.avatar} size="sm" />
                         <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                             <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                             <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                             <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area - Pinned to bottom, respecting spacing */}
            <div className="p-4 pb-8 bg-night border-t border-white/5">
                <div className="bg-white/5 rounded-full px-2 py-2 flex items-center gap-2 border border-white/10 focus-within:border-cyan-400/50 transition-colors">
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm px-4 placeholder-gray-500"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className="p-2.5 bg-cyan-400 text-night rounded-full hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:bg-gray-700 shadow-[0_0_10px_rgba(64,224,208,0.3)]"
                    >
                        <Send size={18} className={inputText.trim() ? "translate-x-0.5" : ""} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessagesView;