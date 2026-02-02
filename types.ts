export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  posts: number;
  followers: number;
  following: number;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  likedByMe: boolean;
  timestamp: string;
  location?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

export interface ChatSession {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export enum ViewState {
  FEED = 'FEED',
  STORIES = 'STORIES',
  SEARCH = 'SEARCH',
  ADD_POST = 'ADD_POST',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
}