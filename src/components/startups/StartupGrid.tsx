
import React, { useState } from 'react';
import StartupCard from './StartupCard';
import { Startup } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StartupGridProps {
  startups: Startup[];
}

const StartupGrid: React.FC<StartupGridProps> = ({ startups }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('valuation');
  
  const industries = ['all', ...new Set(startups.map(s => s.industry))];
  
  const filteredStartups = startups
    .filter(startup => 
      (industryFilter === 'all' || startup.industry === industryFilter) &&
      (
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === 'valuation') {
        return b.valuation - a.valuation;
      } else if (sortBy === 'fundingRequired') {
        return b.fundingRequired - a.fundingRequired;
      } else if (sortBy === 'equityOffered') {
        return b.equityOffered - a.equityOffered;
      } else if (sortBy === 'foundedYear') {
        return b.foundedYear - a.foundedYear;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="sortBy">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sortBy">
              <SelectValue placeholder="Valuation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="valuation">Valuation</SelectItem>
              <SelectItem value="fundingRequired">Funding Required</SelectItem>
              <SelectItem value="equityOffered">Equity Offered</SelectItem>
              <SelectItem value="foundedYear">Founded Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredStartups.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No startups found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupGrid;
