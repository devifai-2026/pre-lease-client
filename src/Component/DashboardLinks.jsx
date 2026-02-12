import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardLinks = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null; // Don't show dashboard link if not logged in
  }

  // Dashboard links based on user role
  const dashboardLinks = {
    investor: {
      path: '/investor-dashboard',
      label: 'Investor Dashboard',
      description: 'View your investments and opportunities'
    },
    broker: {
      path: '/broker-dashboard',
      label: 'Broker Dashboard',
      description: 'Manage your listings and clients'
    },
    owner: {
      path: '/owner-dashboard',
      label: 'Owner Dashboard',
      description: 'Manage your properties'
    }
  };

  const dashboard = dashboardLinks[user.role?.toLowerCase()] || dashboardLinks.investor;

  return (
    <Link to={dashboard.path}>
      <div className="py-3 px-4 font-medium text-sm rounded cursor-pointer transition-all border-l-2 text-[#262626] border-l-transparent hover:bg-gray-50 hover:border-l-2 hover:border-l-[#EE2529] flex items-center gap-2">
        <span className="font-medium">{dashboard.label}</span>
        <span className="text-xs text-gray-500 hidden sm:inline">
          ({dashboard.description})
        </span>
      </div>
    </Link>
  );
};

export default DashboardLinks;