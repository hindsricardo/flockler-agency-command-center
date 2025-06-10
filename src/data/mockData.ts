
export const mockSites = [
  {
    id: '1',
    name: 'TechCorp Website',
    client: 'techcorp.com',
    activeFeeds: 8,
    feedLimit: 10,
    users: 12,
    alerts: 1,
    createdAt: '2024-01-15T00:00:00Z',
    billing: {
      status: 'suspended' as const,
      amount: 240
    }
  },
  {
    id: '2',
    name: 'Fashion Forward Blog',
    client: 'fashionforward.com',
    activeFeeds: 15,
    feedLimit: 25,
    users: 8,
    alerts: 0,
    createdAt: '2024-02-20T00:00:00Z',
    billing: {
      status: 'active' as const,
      amount: 450
    }
  },
  {
    id: '3',
    name: 'Local Restaurant Chain',
    client: 'deliciouseats.com',
    activeFeeds: 5,
    feedLimit: 5,
    users: 3,
    alerts: 2,
    createdAt: '2024-03-10T00:00:00Z',
    billing: {
      status: 'active' as const,
      amount: 150
    }
  },
  {
    id: '4',
    name: 'Healthcare Portal',
    client: 'medcare.com',
    activeFeeds: 12,
    feedLimit: 20,
    users: 25,
    alerts: 0,
    createdAt: '2024-01-05T00:00:00Z',
    billing: {
      status: 'suspended' as const,
      amount: 360
    }
  },
  {
    id: '5',
    name: 'E-commerce Store',
    client: 'shopsmart.com',
    activeFeeds: 3,
    feedLimit: 10,
    users: 6,
    alerts: 0,
    createdAt: '2024-04-01T00:00:00Z',
    billing: {
      status: 'active' as const,
      amount: 90
    }
  },
  {
    id: '6',
    name: 'Educational Platform',
    client: 'learnmore.com',
    activeFeeds: 18,
    feedLimit: 25,
    users: 45,
    alerts: 4,
    createdAt: '2024-02-28T00:00:00Z',
    billing: {
      status: 'active' as const,
      amount: 540
    }
  },
  // Additional sites to demonstrate pagination (44 more sites)
  ...Array.from({ length: 44 }, (_, index) => ({
    id: (index + 7).toString(),
    name: `Demo Site ${index + 1}`,
    client: `demosite${index + 1}.com`,
    activeFeeds: Math.floor(Math.random() * 20) + 1,
    feedLimit: 25,
    users: Math.floor(Math.random() * 50) + 1,
    alerts: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    billing: {
      status: (Math.random() > 0.2 ? 'active' : 'suspended') as 'active' | 'suspended',
      amount: Math.floor(Math.random() * 500) + 100
    }
  }))
];
