import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`py-2 px-4 focus:outline-none ${
            activeTab === index ? 'border-b-2 border-blue-500' : ''
          }`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
