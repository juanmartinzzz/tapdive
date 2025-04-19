import { ChevronDown } from 'lucide-react';
import emojiData from './list.json';
import React, { useState, useMemo, useEffect } from 'react';

const EmojiPicker = ({ onSelect, value = '', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Extract unique categories from emoji data
  useEffect(() => {
    const uniqueCategories = [...new Set(emojiData.emojis.map(emoji => emoji.category))];
    setCategories(uniqueCategories);
  }, []);

  // Filter emojis based on search term and category
  const filteredEmojis = useMemo(() => {
    return emojiData.emojis.filter(emoji => {
      // Filter by category if not 'all'
      if (selectedCategory !== 'all' && emoji.category !== selectedCategory) {
        return false;
      }

      // If no search term, show all emojis in the selected category
      if (!searchTerm) {
        return true;
      }

      // Search in emoji name and keywords
      const searchLower = searchTerm.toLowerCase();
      return (
        emoji.name.toLowerCase().includes(searchLower) ||
        emoji.category.toLowerCase().includes(searchLower) ||
        emoji.subcategory.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, selectedCategory]);

  const handleSelect = (emoji) => {
    onSelect(emoji.emoji);
    setIsOpen(false);
  };

  // Group emojis by category for display
  const emojisByCategory = useMemo(() => {
    const grouped = {};
    filteredEmojis.forEach(emoji => {
      if (!grouped[emoji.category]) {
        grouped[emoji.category] = [];
      }
      grouped[emoji.category].push(emoji);
    });
    return grouped;
  }, [filteredEmojis]);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-full px-4 py-2 border border-gray-300 ${isOpen ? 'rounded-t-md' : 'rounded-md'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || 'Select an emoji'}</span>
        <span className="text-gray-400"><ChevronDown /></span>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full -mt-1 bg-white border border-gray-300 rounded-b-md shadow-lg">
          <div className="sticky top-0 bg-white z-10 p-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search emojis by name or category..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="flex overflow-x-auto py-2 gap-2 mt-2">
              <button
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            {Object.entries(emojisByCategory).map(([category, emojis]) => (
              <div key={category} className="mb-4">
                <h3 className="font-bold text-center text-black mb-2">{category}</h3>

                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={`${emoji.code[0]}-${index}`}
                      className="w-16 h-16 flex items-center justify-center hover:bg-gray-200 rounded text-5xl cursor-pointer"
                      onClick={() => handleSelect(emoji)}
                      title={emoji.name}
                    >
                      {emoji.emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;