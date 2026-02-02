import { User, Post, ChatSession } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'solaris_fan',
  name: 'Alex Costa',
  avatar: 'https://picsum.photos/200/200?random=100',
  bio: '📸 Vivendo em cores quentes | 🌅 Sunset Lover | 📍 Rio de Janeiro',
  posts: 42,
  followers: 1250,
  following: 340,
  isVerified: false
};

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'julia.styles', name: 'Júlia Styles', avatar: 'https://picsum.photos/200/200?random=1', posts: 120, followers: 5400, following: 200, isVerified: true },
  { id: 'u2', username: 'marcos_fit', name: 'Marcos Treino', avatar: 'https://picsum.photos/200/200?random=2', posts: 340, followers: 12000, following: 50, isVerified: false },
  { id: 'u3', username: 'ana.travels', name: 'Ana Viajante', avatar: 'https://picsum.photos/200/200?random=3', posts: 89, followers: 3200, following: 400, isVerified: false },
  { id: 'ai', username: 'solaris.ai', name: 'Solaris AI', avatar: 'https://picsum.photos/200/200?random=99', posts: 0, followers: 1000000, following: 0, isVerified: true },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: MOCK_USERS[0],
    image: 'https://picsum.photos/600/600?random=10',
    caption: 'Aproveitando o pôr do sol incrível de hoje! 🌅 #sunset #vibes',
    likes: 234,
    comments: [],
    likedByMe: false,
    timestamp: '2h',
    location: 'Praia de Ipanema'
  },
  {
    id: 'p2',
    user: MOCK_USERS[1],
    image: 'https://picsum.photos/600/800?random=11',
    caption: 'Treino pago! 💪 Nunca desista dos seus sonhos.',
    likes: 890,
    comments: [],
    likedByMe: true,
    timestamp: '4h',
    location: 'Smart Fit'
  },
  {
    id: 'p3',
    user: MOCK_USERS[2],
    image: 'https://picsum.photos/600/500?random=12',
    caption: 'Cafezinho da tarde nessa cidade maravilhosa ☕',
    likes: 120,
    comments: [],
    likedByMe: false,
    timestamp: '6h',
    location: 'Centro Histórico'
  }
];

export const INITIAL_CHATS: ChatSession[] = [
  {
    id: 'c1',
    user: MOCK_USERS[0],
    lastMessage: 'Adorei a foto nova!',
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Oii!', timestamp: new Date(Date.now() - 100000), isMe: false },
      { id: 'm2', senderId: 'u1', text: 'Adorei a foto nova!', timestamp: new Date(Date.now() - 5000), isMe: false }
    ]
  },
  {
    id: 'c2',
    user: MOCK_USERS[3], // AI User
    lastMessage: 'Como posso ajudar a melhorar seu perfil hoje?',
    unreadCount: 0,
    messages: [
      { id: 'm_ai_1', senderId: 'ai', text: 'Olá! Sou o Solaris AI. Como posso ajudar a melhorar seu perfil hoje? ✨', timestamp: new Date(), isMe: false }
    ]
  }
];
