import React, { useState } from 'react';
import { userProfile, userContacts } from '@/data/userContacts';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'info', label: 'Info' },
  { id: 'history', label: 'History' },
  { id: 'share', label: 'Share' },
];

const iconMap: Record<string, React.ReactNode> = {
  email: <Mail className="w-6 h-6" />,
  github: <Github className="w-6 h-6" />,
  linkedin: <Linkedin className="w-6 h-6" />,
  whatsapp: <MessageCircle className="w-6 h-6" />,
};

export default function ContactsApp() {
  const [activeTab, setActiveTab] = useState('info');
  const [isHoveringScroll, setIsHoveringScroll] = useState(false);

  const handleContactClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden flex flex-col">
      {/* Content Area with Custom Scrollbar */}
      <div
        className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide hover:scrollbar-show"
        onMouseEnter={() => setIsHoveringScroll(true)}
        onMouseLeave={() => setIsHoveringScroll(false)}
        style={{
          scrollbarWidth: isHoveringScroll ? 'thin' : 'none',
          scrollbarColor: '#666 transparent',
        }}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Avatar */}
          <div className="relative mb-6">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full border-4 border-green-500 shadow-lg"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>

          {/* Name and Title */}
          <h1 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h1>
          <p className="text-gray-400 text-sm mb-4">{userProfile.title}</p>
          <p className="text-gray-500 text-xs tracking-widest mb-8">{userProfile.subtitle}</p>

          {/* Contact Cards */}
          <div className="w-full max-w-sm space-y-3">
            {userContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleContactClick(contact.url)}
                className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors flex items-center gap-4 group cursor-pointer"
              >
                <div className="flex-shrink-0 w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                  {iconMap[contact.id]}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-semibold text-sm">{contact.title}</p>
                  <p className="text-gray-400 text-xs">{contact.description}</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm flex justify-center">
        <div className="flex gap-8 px-8 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-blue-500 pb-3'
                  : 'text-gray-400 hover:text-gray-300 pb-3'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hover\:scrollbar-show:hover::-webkit-scrollbar {
          width: 10px;
        }
        .hover\:scrollbar-show:hover::-webkit-scrollbar-track {
          background: transparent;
        }
        .hover\:scrollbar-show:hover::-webkit-scrollbar-thumb {
          background: rgba(100, 100, 100, 0.6);
          border-radius: 5px;
        }
        .hover\:scrollbar-show:hover::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 120, 120, 0.8);
        }
      `}</style>
    </div>
  );
}
