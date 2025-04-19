import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSpace } from '../../contexts/SpaceContext';
import firestore from '../../integrations/firestore';
import BlackButton from '../../components/BlackButton';
import WhiteButton from '../../components/WhiteButton';

const SpaceScreen = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { setCurrentSpace, spaces, setSpaces } = useSpace();

  const [space, setSpace] = useState(null);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taps, setTaps] = useState([]);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const spaceData = await firestore.space.get({ id: spaceId });
        setSpace(spaceData);
        setName(spaceData.name);
        setEmoji(spaceData.emoji || '');
        setIsPublic(spaceData.isPublic);

        // Set as current space in global context
        setCurrentSpace(spaceData);

        // Fetch taps for this space
        // This would need to be implemented in firestore.js
        // For now, we'll just set an empty array
        setTaps([]);
      } catch (error) {
        console.error('Error fetching space:', error);
        setError('Failed to load space. Please try again.');
      }
    };

    fetchSpace();

    // Cleanup function to reset current space when component unmounts
    return () => {
      setCurrentSpace(null);
    };
  }, [spaceId, setCurrentSpace]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Space name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const updatedSpace = {
        ...space,
        name,
        emoji: emoji || '🚀',
        isPublic,
        updatedAt: new Date()
      };

      await firestore.space.upsert({ data: updatedSpace });

      // Update local state
      setSpace(updatedSpace);

      // Update spaces list
      const updatedSpaces = spaces.map(s =>
        s.id === spaceId ? updatedSpace : s
      );
      setSpaces(updatedSpaces);

      // Update current space in global context
      setCurrentSpace(updatedSpace);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating space:', error);
      setError('Failed to update space. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async ({space}) => {
    if (!window.confirm('Are you sure you want to delete this space? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);

    try {
      // Archive space on firestore
      await firestore.space.archive({ data: space });

      // Remove from spaces list
      const updatedSpaces = spaces.filter(s => s.id !== spaceId);
      setSpaces(updatedSpaces);

      // Reset current space
      setCurrentSpace(null);

      // Navigate to home
      navigate('/');
    } catch (error) {
      console.error('Error deleting space:', error);
      setError('Failed to delete space. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!space) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Space' : `${space.emoji || '🚀'} ${space.name}`}
        </h1>

        {!isEditing && (
          <div className="flex gap-2">
            <WhiteButton onClick={() => setIsEditing(true)}>
              Edit
            </WhiteButton>
            <BlackButton onClick={() => handleDelete({space})} disabled={isLoading}>
              Delete
            </BlackButton>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Space Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="emoji" className="block text-sm font-medium text-gray-700 mb-1">
              Emoji (optional)
            </label>
            <input
              type="text"
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full px-4 py-2 border border-soft-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <BlackButton onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </BlackButton>

            <WhiteButton onClick={() => setIsEditing(false)}>
              Cancel
            </WhiteButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white border border-soft-gray rounded-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Space Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{space.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Emoji</p>
                <p className="font-medium">{space.emoji || '🚀'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visibility</p>
                <p className="font-medium">{space.isPublic ? 'Public' : 'Private'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">
                  {space.createdAt ? new Date(space.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-soft-gray rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Taps in this Space</h2>
            {taps.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {taps.map(tap => (
                  <li key={tap.id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{tap.title}</p>
                        <p className="text-sm text-gray-500">{tap.description}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/tap/${tap.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No taps in this space yet.</p>
            )}

            <div className="mt-4">
              <WhiteButton onClick={() => navigate('/new-tap')}>
                Add New Tap
              </WhiteButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceScreen;