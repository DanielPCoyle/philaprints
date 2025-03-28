import React, { RefObject } from "react";
import type { Socket } from "socket.io-client";

interface Conversation {
  id: string;
  user: string;
  email: string;
  status: string;
  unSeenMessages: number;
  conversationKey: string;
  isActive: boolean;
  name: string;
}
export interface ConversationListItemsProps {
  conversations: Conversation[];
  socket: Socket;
  setShowMenu: (showMenu:boolean) => void;
}

export interface AdminLoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export interface GuestLoginProps {
  userName: string;
  setUserName: (userName: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

export interface FormattingBarProps {
  toggleInlineStyle: (style: string) => void;
  toggleBlockType: (type: string) => void;
}

export interface MessageAddonsProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  emojiPickerRef: RefObject<HTMLDivElement>;
  insertEmoji: (emoji: string) => void;
  typing: any;
}

export interface ThumbnailProps {
  files: File[];
  file: File;
  index: number;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  children?: React.ReactNode;
}

export interface ReactionPickerProps {
  reactionsPickerRef: RefObject<HTMLDivElement>;
}

export interface ReactionsProps {
  isSender: boolean;
  reactions: { [key: string]: string[]; };
  removeReactions: (reactions: { emoji: string; }) => void;
}

export interface SubMessageType 
{
  reply: MessageType;
}

export interface Message {
  id?: number;
  conversationKey?: number;
  sender?: string;
  message: string;
  createdAt?: string;
  seen?: boolean;
  reactions?: Record<string, string[]>;
  parentId?: number | null;
  files?: string[];
  replies?: any[];
}

export interface FilePreviewProps {
  message: Message;
}
export interface UrlPreview {
  url: string;
  type?: string;
  title?: string;
  description?: string;
  image?: string;
}
export interface LinkPreviewProps {
  message: Message;
}

export interface MessageType {
  id: string;
  text: string;
  user: string;
  parentId?: string;
  conversationKey: string;
  sender: string;
  message: string;
  createdAt: string;
  seen: boolean;
  reactions: Record<string, string[]>;
  files: string[];
  replies: MessageType[];
}

export interface ChatContextType {
  admins: any[];
  conversations: any[];
  email: string;
  files: any[];
  id: string;
  input: string;
  loading: boolean;
  messages: any[];
  notificationsEnabled: boolean;
  setConversations: (conversations: any[]) => void;
  setEmail: (email: string) => void;
  setFiles: (files: any[]) => void;
  setId: (id: string) => void;
  setInput: (input: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setMessages: (messages: any[]) => void;
  setModalIndex: (index: number) => void;
  setModalSource: (source: string[]) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setUser: (user: any) => void;
  setUserName: (name: string) => void;
  setToken: (token: string) => void;
  setStatus: (status: string) => void;
  status: string;
  socket: any;
  typing: {
    name: string;
  };
  user: any;
  userName: string;
  setNotificationBar: (notificationBar: any[]) => void;
  notificationBar: any[];
  selectedMessageId: number | null;
  setSelectedMessageId: (id: number | null) => void;
// Removed duplicate declaration of Message interface as it is already defined above.
  messagesRef: React.RefObject<HTMLDivElement>;
  token: string;
  setLanguage: (language: string) => void;
  language: string;
  setInit: (init: boolean) => void;
}

export interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
  role: string;
}
