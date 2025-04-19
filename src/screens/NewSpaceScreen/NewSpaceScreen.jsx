import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSpace } from '../../contexts/SpaceContext';
import firestore from '../../integrations/firestore';
import BlackButton from '../../components/BlackButton';
import WhiteButton from '../../components/WhiteButton';
import EmojiPicker from '../../components/EmojiPicker/EmojiPicker';

const NewSpaceScreen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { spaces, setSpaces } = useSpace();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Space name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newSpace = {
        name,
        emoji: emoji || '🚀',
        isPublic,
        userId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const spaceRef = await firestore.space.upsert({ data: newSpace });

      // Add to user's spaces
      await firestore.userSpaceId.upsert({
        userId: currentUser.uid,
        data: {
          spaceId: spaceRef.id,
          createdAt: new Date()
        }
      });

      // Update local state
      const updatedSpace = { ...newSpace, id: spaceRef.id };
      setSpaces([...spaces, updatedSpace]);

      // Navigate to the new space
      navigate(`/space/${spaceRef.id}`);
    } catch (error) {
      console.error('Error creating space:', error);
      setError('Failed to create space. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Space</h1>
      <p className="text-gray-700 mb-4">A Space is a great way to group your Taps for a particular project or theme you want to share with others. This helps keep your content organized and makes it easier for others to find and engage with your work.</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Space Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Your company, project or theme for this space"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-soft-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="emoji" className="block text-sm font-medium text-gray-700 mb-1">
            Emoji (optional)
          </label>
          <EmojiPicker
            value={emoji}
            onSelect={setEmoji}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-soft-gray rounded"
          />
          <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
            Public Space
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <BlackButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Space'}
          </BlackButton>

          <WhiteButton type="button" onClick={() => navigate(-1)}>
            Cancel
          </WhiteButton>
        </div>
      </form>
    </div>
  );
};

export default NewSpaceScreen;