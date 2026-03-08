import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: Record<string, Message[]>;
  addMessage: (paperId: string, message: Message) => void;
  getMessages: (paperId: string) => Message[];
  clearMessages: (paperId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: {},
      addMessage: (paperId, message) => {
        set((state) => ({
          messages: {
            ...state.messages,
            [paperId]: [...(state.messages[paperId] || []), message],
          },
        }));
      },
      getMessages: (paperId) => {
        return get().messages[paperId] || [];
      },
      clearMessages: (paperId) => {
        set((state) => {
          const newMessages = { ...state.messages };
          delete newMessages[paperId];
          return { messages: newMessages };
        });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);