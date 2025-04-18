
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Startup } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { addToWishlist, removeFromWishlist, mockWishlist } from '@/data/mockData';

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  const { user } = useAuth();
  
  const isInWishlist = user?.role === 'investor' && mockWishlist.some(
    item => item.investorId === user.id && item.startupId === startup.id
  );
  
  const toggleWishlist = () => {
    if (!user || user.role !== 'investor') return;
    
    if (isInWishlist) {
      removeFromWishlist(user.id, startup.id);
    } else {
      addToWishlist(user.id, startup.id);
    }
    
    // Force re-render
    window.location.reload();
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={startup.logo} 
            alt={startup.name} 
            className="w-full h-40 object-cover object-center bg-gray-100"
          />
          {user?.role === 'investor' && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </Button>
          )}
        </div>
        
        <div className="p-4">
          <Link to={`/startup/${startup.id}`}>
            <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
              {startup.name}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-500 mb-2">{startup.industry}</p>
          
          <div className="mb-3">
            <p className="text-xl font-bold">{formatCurrency(startup.valuation)}</p>
            <p className="text-sm text-gray-500">
              Funding: {formatCurrency(startup.fundingRequired)} ({startup.equityOffered}% equity)
            </p>
          </div>
          
          <Link to={`/startup/${startup.id}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default StartupCard;
