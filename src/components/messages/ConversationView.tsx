
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockConversations, mockMessages, mockUsers } from '@/data/mockData';
import { format } from 'date-fns';

const ConversationView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Find the conversation
  const conversation = mockConversations.find(c => c.id === id);
  
  if (!user || !conversation) {
    return (
      <div className="text-center py-8">
        <h3 className="font-medium text-lg mb-2">Conversation not found</h3>
        <Link to="/messages">
          <Button>Back to Messages</Button>
        </Link>
      </div>
    );
  }
  
  // Find the other participant
  const otherParticipantId = conversation.participantIds.find(pid => pid !== user.id);
  const otherParticipant = otherParticipantId 
    ? mockUsers.find(u => u.id === otherParticipantId) 
    : null;
  
  // Get messages for this conversation
  const conversationMessages = mockMessages.filter(
    m => conversation.participantIds.includes(m.senderId) && conversation.participantIds.includes(m.receiverId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !otherParticipantId) return;
    
    // In a real app, this would send a request to an API
    const newMsg = {
      id: `${mockMessages.length + 1}`,
      senderId: user.id,
      receiverId: otherParticipantId,
      content: newMessage,
      timestamp: new Date(),
      read: false
    };
    
    mockMessages.push(newMsg);
    
    // Update conversation
    conversation.lastMessageId = newMsg.id;
    conversation.lastMessageTimestamp = newMsg.timestamp;
    
    setNewMessage('');
  };
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Link to="/messages" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        
        {otherParticipant && (
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
              {otherParticipant.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{otherParticipant.name}</p>
              <p className="text-xs text-gray-500">{otherParticipant.role === 'investor' ? 'Investor' : 'Startup'}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationMessages.map(message => {
          const isCurrentUser = message.senderId === user.id;
          const sender = mockUsers.find(u => u.id === message.senderId);
          
          return (
            <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-lg p-3 ${
                isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                  {format(new Date(message.timestamp), 'h:mm a')}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t flex">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 mr-2"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ConversationView;
