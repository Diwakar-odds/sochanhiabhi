// frontend/src/pages/MessagesPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Adjust path

// Shadcn/ui components
import { Card } from '../components/ui/card'; // If needed for overall structure
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
// Icons (npm install lucide-react)
import { MessageSquare, Send, Search } from 'lucide-react';

// Simple AppHeader placeholder
const AppHeader = ({ pageTitle }) => (
  <div className="mb-4 md:mb-6"> {/* Adjusted margin */}
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{pageTitle}</h1>
  </div>
);

// --- Mock Data & API (Replace with actual backend integration) ---
const mockUsersData = { // Simple user lookup for names/avatars
  'user1': { _id: 'user1', username: 'Alice', profileImage: '' },
  'user2': { _id: 'user2', username: 'Bob', profileImage: '' },
  'user3': { _id: 'user3', username: 'Charlie', profileImage: '' },
};

let mockMessagesData = [ // Let, so we can add to it for demo
  { _id: 'msg1', chatId: 'chat_user1_user2', senderId: 'user1', receiverId: 'user2', text: 'Hey Bob, interested in the vintage lamp?', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { _id: 'msg2', chatId: 'chat_user1_user2', senderId: 'user2', receiverId: 'user1', text: 'Hi Alice! Yes, I am. Is it still available?', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
  { _id: 'msg3', chatId: 'chat_user1_user3', senderId: 'user3', receiverId: 'user1', text: 'Hello! Regarding the book swap...', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
];

// Mock API: Fetch chat threads for the current user
const mockFetchChats = async (currentUserId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const userChats = {};
  mockMessagesData.forEach(msg => {
    if (msg.senderId === currentUserId || msg.receiverId === currentUserId) {
      const otherUserId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
      const chatId = [currentUserId, otherUserId].sort().join('_'); // Consistent chat ID

      if (!userChats[chatId]) {
        userChats[chatId] = {
          _id: chatId,
          participants: [currentUserId, otherUserId],
          otherUser: mockUsersData[otherUserId] || { _id: otherUserId, username: 'Unknown User' },
          lastMessage: msg, // Store the whole last message object
          messages: [], // Messages will be fetched when chat is selected
          unreadCount: 0 // Placeholder
        };
      }
      // Update last message if this one is newer
      if (new Date(msg.timestamp) > new Date(userChats[chatId].lastMessage.timestamp)) {
        userChats[chatId].lastMessage = msg;
      }
    }
  });
  // Sort chats by last message timestamp (most recent first)
  return Object.values(userChats).sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
};

// Mock API: Fetch messages for a specific chat
const mockFetchMessagesForChat = async (chatId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockMessagesData
    .filter(msg => [msg.senderId, msg.receiverId].sort().join('_') === chatId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};

// Mock API: Send a message
const mockSendMessage = async (chatId, senderId, receiverId, text) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const newMessage = {
    _id: `msg${Date.now()}`,
    chatId,
    senderId,
    receiverId,
    text,
    timestamp: new Date().toISOString(),
  };
  mockMessagesData.push(newMessage);
  return newMessage;
};
// --- End Mock Data & API ---


export default function MessagesPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Stores the selected chat object
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatsLoading, setChatsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const messagesEndRef = useRef(null); // For scrolling to bottom

  // Fetch chat threads when component mounts or currentUser changes
  useEffect(() => {
    if (currentUser?._id) {
      setChatsLoading(true);
      mockFetchChats(currentUser._id)
        .then(setChats)
        .catch(err => console.error("Error fetching chats:", err))
        .finally(() => setChatsLoading(false));
    }
  }, [currentUser]);

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (selectedChat?._id && currentUser?._id) {
      setMessagesLoading(true);
      mockFetchMessagesForChat(selectedChat._id)
        .then(setCurrentChatMessages)
        .catch(err => console.error("Error fetching messages:", err))
        .finally(() => setMessagesLoading(false));
    } else {
      setCurrentChatMessages([]); // Clear messages if no chat is selected
    }
  }, [selectedChat, currentUser]);

  // Scroll to bottom of messages when new messages arrive or chat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChatMessages]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat || !currentUser?._id) return;

    const otherUserId = selectedChat.participants.find(id => id !== currentUser._id);
    if (!otherUserId) return;

    setSendingMessage(true);
    try {
      const newMessage = await mockSendMessage(selectedChat._id, currentUser._id, otherUserId, messageInput);
      setCurrentChatMessages(prevMessages => [...prevMessages, newMessage]); // Optimistic update
      setMessageInput('');

      // Update the last message in the chats list (for UI consistency)
      setChats(prevChats => prevChats.map(chat =>
        chat._id === selectedChat._id ? { ...chat, lastMessage: newMessage } : chat
      ).sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)));

    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error (e.g., show toast)
    } finally {
      setSendingMessage(false);
    }
  };

  if (authLoading) return <div className="p-4 text-center">Loading user...</div>;
  if (!currentUser) return <div className="p-4 text-center">Please log in to view messages.</div>; // Or redirect

  // Assuming topbar height is 4rem (64px) for calculation. Adjust as needed or use CSS variables.
  // Alternatively, use flexbox to fill height without calc() if possible.
  const dynamicHeight = "calc(100vh - 64px - 4rem - 2rem)"; // 100vh - topbar - AppHeader - page padding

  return (
    <div className="flex flex-col h-full p-4 md:p-6"> {/* Use h-full and let MainLayout control overall height */}
      <AppHeader pageTitle="Messages" />
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-0 border rounded-lg overflow-hidden shadow-md bg-card">
        {/* Chat List */}
        <div className="md:col-span-1 border-r flex flex-col">
          <div className="p-3 border-b">
            <Input placeholder="Search chats (not implemented)" icon={<Search className="h-4 w-4 text-muted-foreground"/>} />
          </div>
          <ScrollArea className="flex-grow"> {/* Use flex-grow for scroll area height */}
            {chatsLoading ? (
              <p className="p-4 text-center text-muted-foreground">Loading chats...</p>
            ) : chats.length > 0 ? (
              chats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => handleSelectChat(chat)}
                  className={`w-full text-left p-3 border-b hover:bg-muted transition-colors flex items-center gap-3
                              ${selectedChat?._id === chat._id ? 'bg-muted' : ''}`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.otherUser.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(chat.otherUser.username)}&background=random`} alt={chat.otherUser.username} />
                    <AvatarFallback>{chat.otherUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow overflow-hidden">
                    <p className="font-semibold text-sm truncate">{chat.otherUser.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage.text}</p>
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">No active chats.</div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 flex flex-col h-full"> {/* Ensure h-full for column flex */}
          {selectedChat ? (
            <>
              <div className="p-3 border-b flex items-center gap-3 bg-card">
                 <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChat.otherUser.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedChat.otherUser.username)}&background=random`} alt={selectedChat.otherUser.username} />
                    <AvatarFallback>{selectedChat.otherUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                <h3 className="text-md font-semibold">{selectedChat.otherUser.username}</h3>
              </div>

              <ScrollArea className="flex-grow p-4 space-y-3 bg-background/70"> {/* Lighter background for chat area */}
                {messagesLoading ? (
                  <p className="text-center text-muted-foreground">Loading messages...</p>
                ) : (
                  currentChatMessages.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.senderId === currentUser._id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] md:max-w-[60%] p-2.5 rounded-lg shadow-sm
                                      ${msg.senderId === currentUser._id 
                                        ? 'bg-primary text-primary-foreground' 
                                        : 'bg-muted text-muted-foreground'}`}>
                        <p className="text-sm break-words">{msg.text}</p>
                        <p className={`text-xs mt-1.5 ${msg.senderId === currentUser._id ? 'text-primary-foreground/80 text-right' : 'text-muted-foreground/80'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
              </ScrollArea>

              <div className="p-3 border-t bg-card flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !sendingMessage && handleSendMessage()}
                  className="flex-grow"
                  disabled={sendingMessage}
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!messageInput.trim() || sendingMessage}>
                  <Send className="h-4 w-4"/>
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground p-8 bg-background/70">
              <MessageSquare className="h-12 w-12 mb-4" />
              <p className="text-md">Select a chat to start messaging</p>
              <p className="text-sm mt-1">Your conversations will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}