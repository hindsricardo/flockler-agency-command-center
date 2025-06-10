
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rss, ExternalLink, AlertTriangle, Link, Settings } from 'lucide-react';
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
  onManageSite?: (site: Site) => void;
}

const SiteCard = ({ site, userRole, onManageSite }: SiteCardProps) => {
  console.log(`Site ${site.name} has feeds: ${site.activeFeeds}/${site.feedLimit}`);
  console.log(`Site ${site.name} alerts: ${site.alerts}`);
  
  // Check if feeds are maxed out
  const feedsMaxedOut = site.activeFeeds >= site.feedLimit;
  console.log(`Site ${site.name} feeds maxed out: ${feedsMaxedOut}`);
  
  // Determine alert types
  const hasFeedLimitAlert = feedsMaxedOut;
  const hasDisconnectedFeedAlerts = site.alerts > 0;
  const totalAlerts = site.alerts + (feedsMaxedOut ? 1 : 0);
  
  console.log(`Site ${site.name} total alerts: ${totalAlerts}`);

  const handleAlertClick = () => {
    if (hasFeedLimitAlert && !hasDisconnectedFeedAlerts) {
      // Only feed limit alert - open manage popup
      onManageSite?.(site);
    } else if (hasDisconnectedFeedAlerts && !hasFeedLimitAlert) {
      // Only disconnected feeds - go to feeds page
      window.location.href = `/site/${site.id}/feeds`;
    } else if (hasDisconnectedFeedAlerts && hasFeedLimitAlert) {
      // Both types - go to feeds page (disconnected feeds are more urgent)
      window.location.href = `/site/${site.id}/feeds`;
    }
  };

  const getAlertMessage = () => {
    if (hasFeedLimitAlert && hasDisconnectedFeedAlerts) {
      return `${totalAlerts} Active Alerts`;
    } else if (hasFeedLimitAlert) {
      return "Feed Limit Reached";
    } else if (hasDisconnectedFeedAlerts) {
      return `${site.alerts} Disconnected Feed${site.alerts > 1 ? 's' : ''}`;
    }
    return `${totalAlerts} Active Alert${totalAlerts > 1 ? 's' : ''}`;
  };

  const getAlertButtonText = () => {
    if (hasFeedLimitAlert && !hasDisconnectedFeedAlerts) {
      return "Manage";
    } else if (hasDisconnectedFeedAlerts) {
      return "View Feeds";
    }
    return "View Details";
  };

  return (
    <Card className={`bg-white hover:shadow-lg transition-all duration-300 border flex flex-col h-full ${totalAlerts > 0 ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 mb-1">
              {site.name}
            </CardTitle>
            <CardDescription className="text-slate-600">
              Domain: www.{site.client}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Alerts Section */}
        {totalAlerts > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  {getAlertMessage()}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-red-300 text-red-700 hover:bg-red-100"
                onClick={handleAlertClick}
              >
                {getAlertButtonText()}
              </Button>
            </div>
            
            {/* Detailed alert breakdown */}
            <div className="mt-2 space-y-1">
              {hasFeedLimitAlert && (
                <div className="text-xs text-red-700 bg-red-100 p-2 rounded">
                  <strong>Feed Limit Reached:</strong> This site is using {site.activeFeeds} of {site.feedLimit} allowed feeds.
                </div>
              )}
              {hasDisconnectedFeedAlerts && (
                <div className="text-xs text-red-700 bg-red-100 p-2 rounded">
                  <strong>Disconnected Feeds:</strong> {site.alerts} feed{site.alerts > 1 ? 's are' : ' is'} currently disconnected and not pulling content.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">{site.users}</div>
              <div className="text-xs text-slate-500">Users</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Rss className={`w-4 h-4 ${feedsMaxedOut ? 'text-red-600' : 'text-green-600'}`} />
            <div>
              <div className={`text-sm font-medium ${feedsMaxedOut ? 'text-red-600 font-bold' : 'text-slate-900'}`}>
                {site.activeFeeds}/{site.feedLimit}
              </div>
              <div className={`text-xs ${feedsMaxedOut ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
                Active Feeds
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Action Buttons and Created Date - Bottom aligned */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button variant="default" size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Site
            </Button>
            <RouterLink to={`/site/${site.id}/feeds`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Link className="w-4 h-4 mr-2" />
                Feeds
              </Button>
            </RouterLink>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onManageSite?.(site)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
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
