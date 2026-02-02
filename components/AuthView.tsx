import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, Star } from 'lucide-react';
import { GradientButton, InputField } from './Shared';

interface AuthViewProps {
  onAuth: (email: string, pass: string, name: string, isRegister: boolean) => Promise<void>;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    setLoading(true);
    try {
      await onAuth(email, password, name, !isLogin);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Changed to h-full to fit within the App container
    <div className="h-full w-full relative flex items-center justify-center overflow-hidden bg-night text-white">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,215,0,0.15),rgba(0,0,0,0)_50%)]"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/30 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-yellow-900/20 rounded-full blur-[80px]"></div>

      <div className="relative z-10 w-full max-w-md px-8">
        <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 mb-4 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
            </div>
          <h1 className="text-6xl font-extralight tracking-tighter text-white mb-2">
            Solaris<span className="text-yellow-400">.</span>
          </h1>
          <p className="text-gray-400 font-light tracking-wide text-sm uppercase">Conecte-se com a luz.</p>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10 animate-fade-in shadow-2xl relative overflow-hidden">
            {/* Gloss Reflection */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          <div className="mb-8 flex justify-center space-x-8 relative z-10">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-2 text-sm uppercase tracking-widest transition-all ${
                isLogin ? 'text-white border-b border-yellow-400' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-2 text-sm uppercase tracking-widest transition-all ${
                !isLogin ? 'text-white border-b border-yellow-400' : 'text-gray-600'
              }`}
            >
              Registro
            </button>
          </div>

          <div className="space-y-4 relative z-10">
            {!isLogin && (
              <InputField
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={18} />}
              />
            )}
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />
            <InputField
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
            />

            <GradientButton 
              fullWidth 
              onClick={handleSubmit} 
              className="mt-8 flex items-center justify-center gap-2 group"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin text-night" />
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Começar'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </GradientButton>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500 relative z-10">
            {isLogin ? 'Esqueceu a senha?' : 'Ao entrar, você concorda com os termos.'} <span className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors">Ajuda</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthView;