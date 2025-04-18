
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockConversations, mockUsers, mockMessages } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const MessageList: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  // Find conversations where the current user is a participant
  const userConversations = mockConversations.filter(
    conv => conv.participantIds.includes(user.id)
  );
  
  if (userConversations.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="font-medium text-lg mb-2">No messages yet</h3>
        <p className="text-gray-500">
          {user.role === 'investor' 
            ? "Reach out to startups you're interested in!"
            : "No investors have contacted you yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {userConversations.map(conversation => {
        // Find the other participant's ID
        const otherParticipantId = conversation.participantIds.find(id => id !== user.id);
        if (!otherParticipantId) return null;
        
        // Get the other participant's info
        const otherParticipant = mockUsers.find(u => u.id === otherParticipantId);
        if (!otherParticipant) return null;
        
        // Get the last message
        const lastMessage = mockMessages.find(m => m.id === conversation.lastMessageId);
        if (!lastMessage) return null;
        
        return (
          <Link
            key={conversation.id}
            to={`/messages/${conversation.id}`}
            className="block hover:bg-gray-50"
          >
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 mr-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {otherParticipant.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">
                    {otherParticipant.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 truncate">
                  {lastMessage.senderId === user.id ? 'You: ' : ''}
                  {lastMessage.content}
                </p>
                
                {conversation.unreadCount > 0 && lastMessage.senderId !== user.id && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                    {conversation.unreadCount} new
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MessageList;
