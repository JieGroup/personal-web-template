import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Send, X, ChevronDown, Loader2, ExternalLink, Book, User, FileText, Info } from 'lucide-react';
import { useChatStore, Message } from './store';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface ChatWidgetProps {
  paperId: string;
  paperTitle: string;
  paperLink: string;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ paperId, paperTitle, paperLink, onClose }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const { addMessage, getMessages } = useChatStore();
  const messages = getMessages(paperId);
  const [isMobile, setIsMobile] = useState(false);

  // Handle clicks outside of disclaimer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDisclaimer &&
        disclaimerRef.current &&
        infoButtonRef.current &&
        !disclaimerRef.current.contains(event.target as Node) &&
        !infoButtonRef.current.contains(event.target as Node)
      ) {
        setShowDisclaimer(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDisclaimer]);

  // Check if device is mobile (debounced)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const debouncedCheckMobile = debounce(checkMobile, 100);
    checkMobile(); // Initial check
    window.addEventListener('resize', debouncedCheckMobile);
    return () => window.removeEventListener('resize', debouncedCheckMobile);
  }, []);

  // Initialize chat with welcome message if empty
  const hasWelcomeMessageAdded = useRef(false);

  useEffect(() => {
    if (!hasWelcomeMessageAdded.current && messages.length === 0) {
      addMessage(paperId, {
        id: uuidv4(),
        role: 'assistant',
        content: `Welcome! I'm here to help you understand this research.\n\nFor example:\n• "What's the main contribution of this research?"\n• "How does it compare to previous work?"\n• "What are the key results or limitations?"`,
        timestamp: new Date(),
      });
      hasWelcomeMessageAdded.current = true;
    }
  }, [paperId, paperTitle, addMessage, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when widget opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    addMessage(paperId, userMessage);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "Based on the paper's methodology section, I can explain that...",
        "The key innovation in this research lies in...",
        "The authors address this challenge by...",
        "This connects to existing literature in the following way...",
        "The experimental results demonstrate that...",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      addMessage(paperId, assistantMessage);
      setIsLoading(false);
    }, 1500);
  }, [input, isLoading, paperId, addMessage]);

  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  }, [onClose]);

  const ChatBox = useMemo(() => (
    <div 
      ref={chatBoxRef}
      className="w-full h-full bg-white dark:bg-primary-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-teal-500 px-4 py-3 flex items-center">
        <div className={`drag-handle flex-1 flex items-center min-w-0 ${!isMobile ? 'cursor-move' : ''}`}>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-white truncate">Ask the Paper's Virtual Author</h3>
            <div className="flex items-center gap-1 relative">
              <p className="text-xs text-white/80 leading-relaxed line-clamp-2 pr-1">
                AI-powered conversation with the authors
              </p>
              <button
                ref={infoButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDisclaimer(!showDisclaimer);
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Info size={12} />
              </button>
              {showDisclaimer && (
                <div
                  ref={disclaimerRef}
                  className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-primary-900 text-primary-900 dark:text-white text-xs rounded-lg shadow-lg z-50 w-64"
                >
                  Responses are AI-generated and may not reflect the authors' official stance.
                </div>
              )}
            </div>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors text-white flex-shrink-0"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Paper Info Card */}
      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border-b border-teal-100 dark:border-teal-800">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-teal-100 dark:bg-teal-800 rounded-lg flex items-center justify-center">
            <FileText size={24} className="text-teal-600 dark:text-teal-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-teal-900 dark:text-teal-100 truncate">{paperTitle}</h4>
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-xs text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 transition-colors"
            >
              <FileText size={14} className="mr-1" />
              View PDF
            </a>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-primary-900">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white dark:bg-primary-800 text-primary-900 dark:text-white'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === 'user' ? (
                  <User size={16} className="flex-shrink-0 mt-1" />
                ) : (
                  <Book size={16} className="flex-shrink-0 mt-1 text-teal-500" />
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-primary-800 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-primary-800 border-t border-gray-200 dark:border-primary-700">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this research..."
            className="flex-1 bg-gray-100 dark:bg-primary-900 border-0 rounded-full px-4 py-2 text-sm text-primary-900 dark:text-white placeholder-primary-500 dark:placeholder-primary-400 focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-teal-500 p-2 rounded-full text-white disabled:opacity-50 transition-opacity hover:bg-teal-600"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="drag-handle bg-gray-50 dark:bg-primary-900 p-3 border-t border-gray-200 dark:border-primary-700">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-primary-500 dark:text-primary-400">Powered by</span>
            <span className="text-sm font-semibold text-teal-500">
              MorphMind AI
            </span>
          </div>
          <a
            href="https://morphmind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-teal-500 hover:underline"
          >
            <span>Register for free to retain chat history</span>
            <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  ), [isMobile, messages, isLoading, input, sendMessage, onClose, paperTitle, showDisclaimer, paperLink]);

  return (
    <div 
      className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center" 
      onClick={handleBackgroundClick}
    >
      {isMobile ? (
        <div className="w-full h-full max-w-lg mx-auto flex items-center justify-center p-4">
          {ChatBox}
        </div>
      ) : (
        <Draggable handle=".drag-handle" bounds="parent">
          <ResizableBox
            width={400}
            height={500}
            minConstraints={[300, 400]}
            maxConstraints={[800, 800]}
            className="relative"
          >
            {ChatBox}
          </ResizableBox>
        </Draggable>
      )}
    </div>
  );
};

// Debounce function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default ChatWidget;