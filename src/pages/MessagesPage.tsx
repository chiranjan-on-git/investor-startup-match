
import React from 'react';
import Layout from '@/components/layout/Layout';
import MessageList from '@/components/messages/MessageList';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const MessagesPage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <MessageList />
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
