import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../App';
import { propertiesAPI } from '../api/client';
import { formatCurrency } from '../utils';
import { 
  ArrowLeft, Search, Plus, Building2, MapPin, 
  Bed, Bath, Square, Heart, Filter, Grid3X3, List
} from 'lucide-react';

export default function Properties() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties', propertyType],
    queryFn: () => propertiesAPI.list({ property_type: propertyType !== 'all' ? propertyType : undefined }).then(r => r.data),
  });

  // Sample properties for demo
  const sampleProperties = [
    {
      id: 'sample-1',
      title: 'Modern Downtown Condo',
      address: '123 Main Street',
      city: 'Miami',
      state: 'FL',
      price: 450000,
      property_type: 'condo',
      status: 'for_sale',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
      features: ['Pool', 'Gym', 'Parking']
    },
    {
      id: 'sample-2',
      title: 'Luxury Beach House',
      address: '456 Ocean Drive',
      city: 'Miami Beach',
      state: 'FL',
      price: 2500000,
      property_type: 'house',
      status: 'for_sale',
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4500,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      features: ['Ocean View', 'Pool', 'Smart Home']
    },
    {
      id: 'sample-3',
      title: 'Cozy Studio Apartment',
      address: '789 Urban Ave',
      city: 'Fort Lauderdale',
      state: 'FL',
      price: 1500,
      property_type: 'apartment',
      status: 'for_rent',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 550,
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
      features: ['Furnished', 'Utilities Included']
    },
  ];

  const allProperties = [...sampleProperties, ...properties];

  const filteredProperties = allProperties.filter(prop => {
    const matchesSearch = 
      prop.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.city?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = propertyType === 'all' || prop.property_type === propertyType;
    
    return matchesSearch && matchesType;
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Properties
                </span>
              </div>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="pl-12 bg-zinc-800 border-zinc-700"
                data-testid="property-search"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[160px] bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-500000">Under $500K</SelectItem>
                  <SelectItem value="500000-1000000">$500K - $1M</SelectItem>
                  <SelectItem value="1000000+">$1M+</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-1 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-zinc-400'}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-zinc-400'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-zinc-400">
            <span className="text-white font-semibold">{filteredProperties.length}</span> properties found
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-emerald-500/30 transition-all group">
                  {/* Image */}
                  <div className="relative aspect-[4/3]">
                    <img
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        property.status === 'for_sale' 
                          ? 'bg-emerald-500/90 text-white' 
                          : 'bg-blue-500/90 text-white'
                      }`}>
                        {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {formatCurrency(property.price)}
                        {property.status === 'for_rent' && <span className="text-sm font-normal">/mo</span>}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-zinc-400 text-sm flex items-center gap-1 mb-4">
                      <MapPin className="w-3 h-3" />
                      {property.address}, {property.city}, {property.state}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1 text-zinc-400">
                          <Bed className="w-4 h-4" />
                          <span>{property.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400">
                        <Square className="w-4 h-4" />
                        <span>{property.sqft?.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* Features */}
                    {property.features && property.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {property.features.slice(0, 3).map((feature, i) => (
                          <span key={i} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-lg">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredProperties.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
            <p className="text-zinc-400">Try adjusting your search filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
