
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockStartups } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import StartupGrid from '@/components/startups/StartupGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      {!user ? (
        <div className="py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Connect Startups with Investors</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            InvestorMatch brings together innovative startups and visionary investors on one platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {user.role === 'investor' 
                ? 'Discover Promising Startups' 
                : 'Welcome Back'}
            </h1>
            <p className="text-gray-600 mt-2">
              {user.role === 'investor'
                ? 'Find your next investment opportunity'
                : 'Connect with potential investors'}
            </p>
          </div>
          
          <StartupGrid startups={mockStartups} />
        </div>
      )}
    </Layout>
  );
};

export default Index;
