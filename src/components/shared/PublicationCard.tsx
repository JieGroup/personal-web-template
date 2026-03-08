import React, { useState, useEffect, useRef } from 'react';
import { FileText, Github, MessageSquare } from 'lucide-react';

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  pdf?: string;
  github?: string;
  chat?: string;
  featured?: boolean;
}

// Define the type for the message event from the iframe
interface ChatWidgetMessage {
  type: string;
  [key: string]: any;
}

export const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {
  const [showChatIframe, setShowChatIframe] = useState(false);
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  
  const parts = publication.venue.split(',');
  const mainVenue = parts[0].trim();
  const extras = parts.slice(1).map(s => s.trim());
  
  // Generate a unique ID for the iframe based on the paper title
  const iframeId = `chat-widget-iframe-${publication.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
  const iframeContainerId = `${iframeId}-container`;
  
  // Set up drag handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && draggableRef.current) {
        const container = draggableRef.current;
        container.style.left = (e.clientX - offsetXRef.current) + 'px';
        container.style.top = (e.clientY - offsetYRef.current) + 'px';
        // Remove the default positioning once dragged
        container.style.bottom = 'auto';
        container.style.right = 'auto';
      }
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Handle messages from the iframe (for closing)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        // Validate that the message is from a trusted source
        const data = event.data as ChatWidgetMessage;
        if (data && data.type === 'CLOSE_WIDGET') {
          // Hide the iframe when we receive a close message
          const container = document.getElementById(iframeContainerId);
          if (container) {
            container.style.display = 'none';
            setShowChatIframe(false);
          }
        }
      } catch (error) {
        console.error('Error handling postMessage event:', error);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Clean up the event listener and iframe when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage);
      
      // Remove the iframe container from the DOM when component unmounts
      const container = document.getElementById(iframeContainerId);
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, [iframeContainerId]);
  
  // Function to toggle the chat iframe
  const toggleChatIframe = () => {
    try {
      if (!showChatIframe) {
        // Create iframe container if it doesn't exist
        if (!document.getElementById(iframeContainerId)) {
          // Create container for draggable functionality
          const container = document.createElement('div');
          container.id = iframeContainerId;
          container.style.position = 'fixed';
          container.style.bottom = '20px';
          container.style.right = '20px';
          container.style.width = '400px';
          container.style.height = '500px';
          container.style.zIndex = '9999';
          container.style.borderRadius = '12px';
          container.style.overflow = 'visible';
          
          // Create draggable header
          const header = document.createElement('div');
          header.style.position = 'absolute';
          header.style.top = '0';
          header.style.left = '0';
          header.style.right = '0';
          header.style.height = '40px';
          header.style.cursor = 'move';
          header.style.zIndex = '10001';
          header.style.touchAction = 'none';
          
          // Add mousedown event listener for dragging
          header.addEventListener('mousedown', (e) => {
            isDraggingRef.current = true;
            const rect = container.getBoundingClientRect();
            offsetXRef.current = e.clientX - rect.left;
            offsetYRef.current = e.clientY - rect.top;
            
            // Prevent iframe from capturing mouse events while dragging
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.zIndex = '10000';
            document.body.appendChild(overlay);
            
            const onMouseMove = (e: MouseEvent) => {
              if (isDraggingRef.current) {
                const x = e.clientX - offsetXRef.current;
                const y = e.clientY - offsetYRef.current;
                container.style.left = `${x}px`;
                container.style.top = `${y}px`;
                container.style.right = 'auto';
                container.style.bottom = 'auto';
              }
            };
            
            const onMouseUp = () => {
              isDraggingRef.current = false;
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
              document.body.removeChild(overlay);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          });
          
          container.appendChild(header);
          
          // Create iframe
          const iframe = document.createElement('iframe');
          iframe.id = iframeId;
          
          // Validate the chat URL before setting it
          if (!publication.chat || typeof publication.chat !== 'string') {
            console.error('Invalid chat URL:', publication.chat);
            return;
          }
          
          iframe.src = publication.chat;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.style.borderRadius = '12px';
          iframe.style.backgroundColor = 'transparent';
          iframe.allow = 'microphone';
          iframe.title = `Chat for ${publication.title}`;

          // Handle messages from iframe
          const handleMessage = (event: MessageEvent) => {
            try {
              // Extract the base domain from the chat URL for origin checking
              const chatUrl = new URL(publication.chat);
              const expectedOrigin = `${chatUrl.protocol}//${chatUrl.hostname}`;
              
              // Check if the message is from our chat widget
              if (event.origin.startsWith(expectedOrigin)) {
                const data = event.data;
                if (data.type === 'CLOSE_WIDGET') {
                  const container = document.getElementById(iframeContainerId);
                  if (container) {
                    container.remove();
                    setShowChatIframe(false);
                  }
                } else if (data.type === 'REGISTER_CLICK' || data.type === 'OPEN_REGISTER') {
                  // Extract the token from the original chat URL
                  const token = chatUrl.pathname.split('/').pop() || '';
                  // Construct the registration URL with the token
                  const registerUrl = `${expectedOrigin}/register?token=${token}`;
                  window.open(registerUrl, '_blank');
                }
              }
            } catch (error) {
              console.error('Error handling widget message:', error);
            }
          };

          window.addEventListener('message', handleMessage);
          
          // Cleanup function for the message listener
          const cleanup = () => {
            window.removeEventListener('message', handleMessage);
          };

          // Store cleanup function
          (container as any)._cleanup = cleanup;
          
          container.appendChild(iframe);
          document.body.appendChild(container);
        }
      } else {
        const container = document.getElementById(iframeContainerId);
        if (container) {
          // Call cleanup function if it exists
          if ((container as any)._cleanup) {
            (container as any)._cleanup();
          }
          container.remove();
        }
      }
      
      setShowChatIframe(!showChatIframe);
    } catch (error) {
      console.error('Error toggling chat iframe:', error);
    }
  };
  
  return (
    <>
      <div className="bg-white dark:bg-primary-800/50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-primary-200 dark:border-primary-700">
        <h4 className="font-medium text-primary-900 dark:text-white mb-2">
          {publication.title}
        </h4>
        <p className="text-sm text-primary-600 dark:text-white mb-3">
          {publication.authors.join(', ')}
        </p>
        <p className="text-sm mb-4 dark:text-white">
          <span className="font-semibold text-primary-600 dark:text-white">
            {mainVenue}
          </span>
          {extras.map((extra, idx) =>
            /oral presentation/i.test(extra) || /spotlight presentation/i.test(extra) ? (
              <span key={idx} className="ml-2 font-semibold text-primary-600 dark:text-white">
                {extra.charAt(0).toUpperCase() + extra.slice(1)}
              </span>
            ) : (
              <span key={idx} className="ml-2 text-primary-600 dark:text-white">
                {extra}
              </span>
            )
          )}
          <span>, {publication.year}</span>
        </p>
        
        <div className="flex space-x-3">
          <a
            href={publication.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-3 py-1 rounded-md bg-section-purple-light/10 dark:bg-section-purple-dark/10 text-section-purple-light dark:text-section-purple-dark hover:bg-section-purple-light/20 dark:hover:bg-section-purple-dark/20 transition-colors text-sm ${publication.pdf === "#" ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FileText size={14} className="mr-1" />
            PDF
          </a>
          {publication.github && publication.github !== "#" && (
            <a
              href={publication.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-md bg-section-green-light/10 dark:bg-section-green-dark/10 text-section-green-light dark:text-section-green-dark hover:bg-section-green-light/20 dark:hover:bg-section-green-dark/20 transition-colors text-sm"
            >
              <Github size={14} className="mr-1" />
              Code
            </a>
          )}
          {publication.chat && publication.chat.trim() !== "#" && (
            <button
              onClick={toggleChatIframe}
              className="inline-flex items-center px-3 py-1 rounded-md bg-section-blue-light/10 dark:bg-section-blue-dark/10 text-section-blue-light dark:text-section-blue-dark hover:bg-section-blue-light/20 dark:hover:bg-section-blue-dark/20 transition-colors text-sm"
              aria-label={`Open chat about ${publication.title}`}
              title="Chat with AI about this paper"
            >
              <MessageSquare size={14} className="mr-1" />
              Chat
            </button>
          )}
        </div>
      </div>
    </>
  );
};