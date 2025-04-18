
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getWishlistForInvestor } from '@/data/mockData';
import StartupCard from '@/components/startups/StartupCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WishlistView: React.FC = () => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'investor') {
    return null;
  }
  
  const wishlistStartups = getWishlistForInvestor(user.id);
  
  if (wishlistStartups.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="font-medium text-lg mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-4">
          Save startups you're interested in to revisit them later
        </p>
        <Link to="/">
          <Button>Browse Startups</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistStartups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  );
};

export default WishlistView;
