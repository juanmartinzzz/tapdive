import { Blocks } from 'lucide-react';
import React from 'react';

const HomeScreen = () => {
  return (
    <div className="py-12">
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Tapdive!</h1>
      <p className="mt-4 text-xl">Our homepage is under design</p>
      <div className="mt-4 flex justify-center"><Blocks size={24} /></div>
      <p className="mt-4 text-xl">We're brainstorming ideas on how to make landing here immediately useful or interesting for y'all.</p>
      <p className="mt-4 text-2xl">If you have any ideas please create a <span className="gradient-text">Tap</span> and we'll take a look!</p>
    </div>
    </div>
  );
};

export default HomeScreen;