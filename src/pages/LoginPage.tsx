
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {isLoginView ? (
            <LoginForm onToggleForm={toggleView} />
          ) : (
            <RegisterForm onToggleForm={toggleView} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
