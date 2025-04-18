
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Format the date safely by handling both string and Date objects
  const formatDate = (date: Date | string) => {
    if (!date) return 'N/A';
    
    // Convert to a Date object if it's a string
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if the date is valid before formatting
    return isNaN(dateObj.getTime()) ? 'Invalid date' : dateObj.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            
            <Button onClick={logout} variant="destructive">
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
