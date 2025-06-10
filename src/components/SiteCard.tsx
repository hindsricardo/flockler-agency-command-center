
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rss, ExternalLink, AlertTriangle, Link } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

interface Site {
  id: string;
  name: string;
  client: string;
  activeFeeds: number;
  feedLimit: number;
  users: number;
  alerts: number;
  createdAt: string;
  billing: {
    status: 'active' | 'suspended';
    amount: number;
  };
}

interface SiteCardProps {
  site: Site;
  userRole: 'owner' | 'manager';
}

const SiteCard = ({ site, userRole }: SiteCardProps) => {
  console.log(`Site ${site.name} has status: ${site.billing.status}`);
  console.log(`Site ${site.name} full billing object:`, site.billing);
  console.log(`Site ${site.name} full site object:`, site);
  
  const getStatusColor = (status: string) => {
    console.log(`Getting color for status: ${status}`);
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusColor = getStatusColor(site.billing.status);
  console.log(`${site.name} final status color: ${statusColor}`);

  return (
    <Card className={`bg-white hover:shadow-lg transition-all duration-300 border flex flex-col h-full ${site.alerts > 0 ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
              {site.name}
            </CardTitle>
            <CardDescription className="text-slate-600">
              Domain: {site.client}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Alerts Section */}
        {site.alerts > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  {site.alerts} Active Alert{site.alerts > 1 ? 's' : ''}
                </span>
              </div>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100">
                View Details
              </Button>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">{site.users}</div>
              <div className="text-xs text-slate-500">Users</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Rss className="w-4 h-4 text-green-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">
                {site.activeFeeds}
              </div>
              <div className="text-xs text-slate-500">Active Feeds</div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Now at bottom */}
        <div className="mt-4 space-y-4">
          <div className="flex space-x-2">
            <Button variant="default" size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Site
            </Button>
            <RouterLink to={`/site/${site.id}/feeds`}>
              <Button variant="outline" size="sm">
                <Link className="w-4 h-4 mr-2" />
                Feeds
              </Button>
            </RouterLink>
            {userRole === 'owner' && (
              <Button variant="outline" size="sm">
                Manage
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Created {new Date(site.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteCard;
