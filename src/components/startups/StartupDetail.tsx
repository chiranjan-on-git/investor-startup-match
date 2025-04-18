
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStartups } from '@/data/mockData';
import { ArrowLeft, Globe, Phone, Mail, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { addToWishlist, removeFromWishlist, mockWishlist } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StartupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const startup = mockStartups.find(s => s.id === id);
  
  if (!startup) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Startup not found</h3>
        <p className="mt-2 text-sm text-gray-500">
          The startup you're looking for doesn't exist or has been removed
        </p>
        <Link to="/">
          <Button className="mt-4">Go back home</Button>
        </Link>
      </div>
    );
  }
  
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
  
  const financialData = startup.financialHistory.map(item => ({
    year: item.year,
    Revenue: item.revenue,
    Expenses: item.expenses,
    Profit: item.revenue - item.expenses
  }));
  
  // Calculate simple investment simulation
  const simulateInvestment = (amount: number) => {
    const equity = (amount / startup.fundingRequired) * startup.equityOffered;
    const currentValue = (equity / 100) * startup.valuation;
    
    return {
      investmentAmount: amount,
      equityPercentage: equity,
      currentValue,
      potentialValue5y: currentValue * 1.5, // Simple projection
      potentialValue10y: currentValue * 3    // Simple projection
    };
  };
  
  const simulationExample = simulateInvestment(startup.fundingRequired / 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Startups
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{startup.name}</h1>
              <p className="text-gray-500">{startup.industry} • {startup.location}</p>
            </div>
            
            {user?.role === 'investor' && (
              <Button
                variant={isInWishlist ? "outline" : "default"}
                onClick={toggleWishlist}
                className="flex items-center"
              >
                <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                {isInWishlist ? 'Saved' : 'Save'}
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="py-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-lg font-medium">Founded {startup.foundedYear}</p>
                      <p className="text-gray-500">Operating for {new Date().getFullYear() - startup.foundedYear} years</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">Funding Status</p>
                      <p className="text-gray-500 capitalize">{startup.status}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-gray-700 mb-6">{startup.description}</p>
                  
                  <h3 className="text-lg font-medium mb-2">Founder</h3>
                  <p className="font-medium">{startup.founder}</p>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${startup.founderEmail}`} className="hover:text-blue-600">
                      {startup.founderEmail}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${startup.founderPhone}`} className="hover:text-blue-600">
                      {startup.founderPhone}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Globe className="h-4 w-4 mr-2" />
                    <a 
                      href={startup.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {startup.website}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financials" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={financialData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [
                            formatCurrency(value),
                            ''
                          ]}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="Revenue" 
                          stroke="#3B82F6" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Expenses" 
                          stroke="#EF4444" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Profit" 
                          stroke="#10B981" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {startup.financialHistory.map((item) => (
                      <div key={item.year} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{item.year}</h4>
                        <div className="space-y-1 text-sm">
                          <p className="flex justify-between">
                            <span>Revenue:</span>
                            <span className="font-medium">{formatCurrency(item.revenue)}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Expenses:</span>
                            <span className="font-medium">{formatCurrency(item.expenses)}</span>
                          </p>
                          <p className="flex justify-between">
                            <span>Profit/Loss:</span>
                            <span className={`font-medium ${
                              item.revenue - item.expenses >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatCurrency(item.revenue - item.expenses)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="investment" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Opportunity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Valuation</h4>
                      <p className="text-2xl font-bold">{formatCurrency(startup.valuation)}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Funding Required</h4>
                      <p className="text-2xl font-bold">{formatCurrency(startup.fundingRequired)}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Equity Offered</h4>
                      <p className="text-2xl font-bold">{startup.equityOffered}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Risk Assessment</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-1">Market Risk: Medium</h4>
                          <p className="text-sm text-gray-600">
                            The company operates in a competitive market but has shown good traction.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Financial Risk: {
                            financialData[financialData.length - 1].Profit > 0 ? 'Low' : 'Medium'
                          }</h4>
                          <p className="text-sm text-gray-600">
                            {financialData[financialData.length - 1].Profit > 0 
                              ? 'The company is profitable and has shown consistent growth.'
                              : 'The company is not yet profitable but showing progress towards profitability.'
                            }
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Team Risk: Low</h4>
                          <p className="text-sm text-gray-600">
                            The founding team has experience in the industry and previous startup success.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Investment Simulator</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        Here's a sample simulation if you invest {formatCurrency(simulationExample.investmentAmount)}:
                      </p>
                      
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span>Investment amount:</span>
                          <span className="font-medium">{formatCurrency(simulationExample.investmentAmount)}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Equity percentage:</span>
                          <span className="font-medium">{simulationExample.equityPercentage.toFixed(2)}%</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Current equity value:</span>
                          <span className="font-medium">{formatCurrency(simulationExample.currentValue)}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Potential value (5 years):</span>
                          <span className="font-medium text-green-600">{formatCurrency(simulationExample.potentialValue5y)}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Potential value (10 years):</span>
                          <span className="font-medium text-green-600">{formatCurrency(simulationExample.potentialValue10y)}</span>
                        </p>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-4">
                        Note: This is a simplified simulation based on typical growth patterns and is not a guarantee of future performance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Link to="/messages">
                      <Button size="lg">
                        Contact Startup
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Valuation</p>
                  <p className="text-xl font-bold">{formatCurrency(startup.valuation)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Funding Required</p>
                  <p className="text-xl font-bold">{formatCurrency(startup.fundingRequired)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Equity Offered</p>
                  <p className="text-xl font-bold">{startup.equityOffered}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-xl font-bold capitalize">{startup.status}</p>
                </div>
              </div>
              
              {user?.role === 'investor' && (
                <div className="mt-6 space-y-3">
                  <Link to="/messages">
                    <Button className="w-full">Contact Startup</Button>
                  </Link>
                  
                  <Button
                    variant={isInWishlist ? "outline" : "secondary"}
                    onClick={toggleWishlist}
                    className="w-full"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Similar Startups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStartups
                  .filter(s => s.id !== startup.id && s.industry === startup.industry)
                  .slice(0, 3)
                  .map(s => (
                    <Link key={s.id} to={`/startup/${s.id}`}>
                      <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                        <img 
                          src={s.logo} 
                          alt={s.name} 
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-sm text-gray-500">{formatCurrency(s.valuation)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
