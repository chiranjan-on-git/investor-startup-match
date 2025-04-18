
import React from 'react';
import Layout from '@/components/layout/Layout';
import WishlistView from '@/components/investor/WishlistView';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const WishlistPage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'investor') {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <WishlistView />
    </Layout>
  );
};

export default WishlistPage;
