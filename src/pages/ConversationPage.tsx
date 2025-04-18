
import React from 'react';
import Layout from '@/components/layout/Layout';
import ConversationView from '@/components/messages/ConversationView';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ConversationPage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-12rem)]">
        <ConversationView />
      </div>
    </Layout>
  );
};

export default ConversationPage;
