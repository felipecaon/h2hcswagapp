import React from 'react';
import { Shirt, Gift, Package } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
}

export function Sidebar({ activeSection, onSectionChange, isOpen }: SidebarProps) {
  const navigation = [
    {
      items: [
        {
          id: 'camisetas',
          name: 'Camisetas',
          icon: Shirt
        },
        {
          id: 'swags',
          name: 'Swags',
          icon: Gift
        }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'mobile-hidden' : ''}`}>
      <div className="nav-menu">
        {/* Logo/Brand */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-bold text-lg text-gray-900">BBV Swag</h1>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        {navigation.map((section) => (
          <div key="main-nav">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  <Icon className="nav-item-icon" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}


      </div>
    </aside>
  );
}
