
import { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, Users, Rss, AlertTriangle, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteCard from '@/components/SiteCard';
import AddSiteDialog from '@/components/AddSiteDialog';
import { mockSites } from '@/data/mockData';

const Index = () => {
  const [userRole] = useState<'owner' | 'manager'>('owner'); // Mock user role - in real app this would come from auth
  const [sites, setSites] = useState(mockSites);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [showAddSite, setShowAddSite] = useState(false);
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  // Calculate next invoice date (example: 15th of next month)
  const getNextInvoiceDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
    return nextMonth.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Filter and sort sites
  const filteredAndSortedSites = sites
    .filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAlertFilter = showAlertsOnly ? site.alerts > 0 : true;
      return matchesSearch && matchesAlertFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'activeFeeds':
          return b.activeFeeds - a.activeFeeds;
        default:
          return 0;
      }
    });

  const totalSites = sites.length;
  const totalActiveFeeds = sites.reduce((sum, site) => sum + site.activeFeeds, 0);
  const sitesWithAlerts = sites.filter(site => site.alerts > 0).length;

  const handleAddSite = (newSite: any) => {
    const site = {
      id: Date.now().toString(),
      ...newSite,
      activeFeeds: 0,
      users: 1,
      alerts: 0,
      createdAt: new Date().toISOString(),
      billing: { status: 'active', amount: 0 }
    };
    setSites([...sites, site]);
    setShowAddSite(false);
  };

  const handleShowAlertsOnly = () => {
    setShowAlertsOnly(!showAlertsOnly);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Flockler Agency Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage all your client sites in one place</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-sm">
                {userRole === 'owner' ? 'Agency Owner' : 'Manager'}
              </Badge>
              {userRole === 'owner' && (
                <Button onClick={() => setShowAddSite(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Site
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Next Invoice Date Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg text-slate-900">Next Invoice Date</CardTitle>
                    <CardDescription className="text-slate-600">
                      Your next billing cycle begins on {getNextInvoiceDate()}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  View Billing Details
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Sites</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalSites}</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Feeds</CardTitle>
              <Rss className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalActiveFeeds}</div>
            </CardContent>
          </Card>

          <Card 
            className={`bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer ${sitesWithAlerts > 0 ? 'ring-2 ring-red-200 hover:ring-red-300' : ''}`}
            onClick={handleShowAlertsOnly}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Sites with Alerts</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${sitesWithAlerts > 0 ? 'text-red-600' : 'text-slate-400'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${sitesWithAlerts > 0 ? 'text-red-600' : 'text-slate-900'}`}>
                {sitesWithAlerts}
              </div>
              {sitesWithAlerts > 0 && (
                <p className="text-xs text-red-600 mt-1">Click to view alerts</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Billing</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$2,340</div>
              <p className="text-xs text-slate-500 mt-1">Based on active feeds</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search sites or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {showAlertsOnly && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowAlertsOnly(false)}
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Showing Alerts Only
                </Button>
              )}
              <div className="sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="activeFeeds">Most Active Feeds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedSites.map((site) => (
            <SiteCard key={site.id} site={site} userRole={userRole} />
          ))}
        </div>

        {filteredAndSortedSites.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg mb-2">
              {showAlertsOnly ? 'No sites with alerts found' : 'No sites found'}
            </div>
            <p className="text-slate-500">
              {showAlertsOnly ? 'All sites are running smoothly!' : 'Try adjusting your search or filters'}
            </p>
          </div>
        ))}
      </div>

      {/* Add Site Dialog */}
      <AddSiteDialog
        open={showAddSite}
        onOpenChange={setShowAddSite}
        onAddSite={handleAddSite}
      />
    </div>
  );
};

export default Index;
