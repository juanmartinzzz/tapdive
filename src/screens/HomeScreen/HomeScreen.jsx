import React from 'react';
import Tap from '../../components/Tap/Tap';

const HomeScreen = () => {
  // This would typically come from an API or state management
  const sampleTaps = [
    {
      id: 1,
      title: "Getting Started with React",
      content: "React is a JavaScript library for building user interfaces..."
    },
    {
      id: 2,
      title: "Understanding Hooks",
      content: "Hooks are a new addition in React 16.8..."
    },
    {
      id: 3,
      title: "State Management with Redux",
      content: "Redux is a predictable state container for JavaScript apps..."
    }
  ];

  return (
    <div className="ml-[250px] mt-[80px] p-8 min-h-[calc(100vh-80px)]">
      <div className="max-w-[800px] mx-auto">
        {sampleTaps.map(tap => (
          <Tap
            key={tap.id}
            title={tap.title}
            content={tap.content}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;