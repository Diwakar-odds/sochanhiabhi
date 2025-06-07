// frontend/src/components/Proposal/MessageThread.jsx
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area'; // shadcn/ui

const MessageThread = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  if (!messages || messages.length === 0) {
    return <div className="p-4 text-center text-sm text-muted-foreground">No messages yet. Start the conversation!</div>;
  }

  return (
    <ScrollArea className="h-full p-4 space-y-3 bg-background/70"> {/* Adjust height as needed */}
      {messages.map((msg) => (
        <div key={msg._id} className={`flex ${msg.sender === currentUserId || msg.sender?._id === currentUserId ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[70%] md:max-w-[60%] p-2.5 rounded-lg shadow-sm text-sm break-words
                        ${msg.sender === currentUserId || msg.sender?._id === currentUserId
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-card-foreground'}`} /* Use card-foreground for muted */
          >
            <p>{msg.text}</p>
            <p className={`text-xs mt-1.5 ${msg.sender === currentUserId || msg.sender?._id === currentUserId ? 'text-primary-foreground/80 text-right' : 'text-muted-foreground/80'}`}>
              {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};

export default MessageThread;