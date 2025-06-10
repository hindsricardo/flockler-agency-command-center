import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Rss, ExternalLink, MoreVertical, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockSites } from '@/data/mockData';

const Feeds = () => {
  const { siteId } = useParams();
  const site = mockSites.find(s => s.id === siteId);

  // Mock feeds data for the site
  const mockFeeds = [
    {
      id: '1',
      name: 'Instagram Feed',
      type: 'instagram',
      status: 'active',
      embedLocation: 'Homepage Hero',
      lastUpdated: '2 hours ago',
      posts: 24
    },
    {
      id: '2',
      name: 'Twitter Timeline',
      type: 'twitter',
      status: 'active',
      embedLocation: 'About Page',
      lastUpdated: '5 minutes ago',
      posts: 18
    },
    {
      id: '3',
      name: 'Facebook Events',
      type: 'facebook',
      status: 'paused',
      embedLocation: 'Events Section',
      lastUpdated: '1 day ago',
      posts: 6
    }
  ];

  if (!site) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Site not found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return <Rss className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{site.name} - Feeds</h1>
                <p className="text-slate-600 mt-1">Manage social media feeds for {site.client}</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Feed
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Site Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900">{site.name}</CardTitle>
                <CardDescription className="text-slate-600">
                  {site.activeFeeds} active feeds • {site.feedLimit} feed limit
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Feeds List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Active Feeds</h2>
            <span className="text-sm text-slate-600">{mockFeeds.length} feeds total</span>
          </div>

          <div className="grid gap-4">
            {mockFeeds.map((feed) => (
              <Card key={feed.id} className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getTypeIcon(feed.type)}
                      <div>
                        <CardTitle className="text-base font-semibold text-slate-900">
                          {feed.name}
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          Embedded in: {feed.embedLocation}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(feed.status)}>
                        {feed.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span>{feed.posts} posts</span>
                      <span>•</span>
                      <span>Updated {feed.lastUpdated}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
