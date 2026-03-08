import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Linkedin, GraduationCap, X, Calendar } from 'lucide-react';
import { siteConfig } from '../config/site.config';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research' },
    { id: 'students', label: 'Team' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'outreach', label: 'Outreach' },
    { id: 'cv', label: 'CV' }
  ];

  const attendingEvents = [
    { date: 'April, 2025', event: 'ICLR, Singapore' },
    { date: 'May, 2025', event: 'NAACL, Albuquerque' },
    { date: 'Mar, 2025', event: 'AI+Health workshop, UMN' },
  ];

  // Helper function to parse the date string (e.g., "April, 2025") into a valid Date object
  const parseDate = (dateString: string) => {
    const [month, year] = dateString.split(', ');
    return new Date(`${month} 1, ${year}`);
  };

  // Filter and sort events
  const now = new Date(); // Current date
  const sortedEvents = attendingEvents
    .map((item) => ({
      ...item,
      date: parseDate(item.date), // Convert date string to Date object
    }))
    .filter((item) => !isNaN(item.date.getTime())) // Filter out invalid dates
    .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sort by date
    .filter((item) => item.date >= now) // Filter out past events
    .slice(0, 3); // Show only the next 3 upcoming events



  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/${tabId === 'home' ? '' : tabId}`);
  };


  return (
    <aside className="w-72 h-screen sticky top-0 flex-shrink-0 bg-white dark:bg-primary-900 shadow-md overflow-y-auto">
      <div className="flex flex-col h-full p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <div 
            className="w-40 h-40 rounded-full overflow-hidden border-primary-200 dark:border-primary-700 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              setActiveTab('home');
              navigate('/');
              scrollToTop();
            }}
          >
            <img 
              src={siteConfig.profilePhoto} 
              alt={siteConfig.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-primary-900 dark:text-white">{siteConfig.name}</h1>
          <p className="text-sm text-primary-600 dark:text-primary-300 text-center mt-1">
            {siteConfig.title}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div 
            className="group cursor-pointer flex items-center text-sm text-primary-700 dark:text-primary-300"
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin 
              size={16} 
              className="mr-2 text-section-blue-light dark:text-section-blue-dark group-hover:scale-110 transition-transform" 
            />
            <span className="group-hover:text-section-blue-light dark:group-hover:text-section-blue-dark transition-colors">
              {siteConfig.address}
            </span>
          </div>
          
          {showMap && (
            <div className="relative mt-2 rounded-lg overflow-hidden border border-primary-200 dark:border-primary-700">
              <button
                onClick={() => setShowMap(false)}
                className="absolute top-2 right-2 z-10 p-1 bg-white dark:bg-primary-800 rounded-full shadow-md hover:bg-primary-100 dark:hover:bg-primary-700 transition-colors"
              >
                <X size={16} className="text-primary-600 dark:text-primary-300" />
              </button>
              <img
                src={siteConfig.officeMapImage}
                alt="Ford Hall Location Map"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          <a 
            href={`mailto:${siteConfig.email}`} 
            className="group flex items-center text-sm text-primary-700 dark:text-primary-300"
          >
            <Mail 
              size={16} 
              className="mr-2 text-section-blue-light dark:text-section-blue-dark group-hover:scale-110 transition-transform" 
            />
            <span className="group-hover:text-section-blue-light dark:group-hover:text-section-blue-dark transition-colors">
              {siteConfig.email}
            </span>
          </a>
        </div>

        {/* Attending Section */}
        <div className="mb-6">
          {/* <h2 className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-2 flex items-center">
            <Calendar size={16} className="mr-1 text-section-blue-light dark:text-section-blue-dark" />
            Attending
          </h2> */}
          <div className="pl-1 border-l-2 border-primary-200 dark:border-primary-700">
            {sortedEvents.map((item, index) => {
              const isPastEvent = item.date < now; // Check if the event is in the past

              // Format the date to "YYYY MMM" (e.g., "2025 Apr")
              const formattedDate = item.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              });

              return (
                <div
                  key={index}
                  className={`py-1.5 text-sm flex items-center space-x-1 px-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg mb-1 ${
                    isPastEvent ? 'line-through opacity-50' : ''
                  }`} // Apply strikethrough and opacity for past events
                >
                  <div className="text-primary-500 dark:text-primary-400 text-xs font-medium min-w-[5rem]">
                    {formattedDate}
                  </div>
                  <div className="text-primary-800 dark:text-primary-300 truncate text-xs">
                    {item.event}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Menu - Moved lower */}
        <div className="mt-auto mb-8">
          <nav>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                        : 'text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-section-blue-light dark:text-section-blue-dark hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={siteConfig.social.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-section-blue-light dark:text-section-blue-dark hover:scale-110 transition-transform"
              aria-label="Google Scholar"
            >
              <GraduationCap size={20} />
            </a>
          </div>
          <p className="text-xs text-center text-primary-500 dark:text-primary-400">
            © {new Date().getFullYear()} {siteConfig.copyright}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;