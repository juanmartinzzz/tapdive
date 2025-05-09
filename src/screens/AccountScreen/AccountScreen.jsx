import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSpace } from '../../contexts/SpaceContext';
import firestore from '../../integrations/firestore';
import BlackButton from '../../components/BlackButton';
import WhiteButton from '../../components/WhiteButton';
import { SiGithub, SiInstagram, SiX } from '@icons-pack/react-simple-icons';
import { Linkedin } from 'lucide-react';

const AccountScreen = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const { spaces } = useSpace();
  const [nickname, setNickname] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    github: '',
    linkedin: '',
    instagram: ''
  });
  const [userSpaces, setUserSpaces] = useState([]);
  const [userTaps, setUserTaps] = useState([]);
  const [visibleSpaces, setVisibleSpaces] = useState(4);
  const [visibleTaps, setVisibleTaps] = useState(9);
  // const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        // Fetch user profile data
        const userProfile = await firestore.user.getById({ id: currentUser.uid });
        if (userProfile) {
          setUserProfile(userProfile);
          setNickname(userProfile.nickname || '');
          // setSocialLinks(userProfile.socialLinks || {});
        }

        // Fetch user's spaces
        const userSpaces = await firestore.space.getForUser({ userId: currentUser.uid });
        setUserSpaces(userSpaces);

        // Fetch user's taps
        const userTaps = await firestore.tap.getByUserId({ userId: currentUser.uid });
        setUserTaps(userTaps);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSaveProfile = async () => {
    try {
      await firestore.user.upsert({data: userProfile});
      // setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const loadMoreSpaces = () => {
    setVisibleSpaces(prev => prev + 2);
  };

  const loadMoreTaps = () => {
    setVisibleTaps(prev => prev + 9);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your account.</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-8 max-w-6xl mx-auto">
      {/* Profile Section */}
      <div className="bg-white border border-soft-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

        <div className="space-y-6">
          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your nickname or handle
            </label>

            <input
              type="text"
              value={userProfile?.nickname || ''}
              onChange={({target}) => setUserProfile({...userProfile, nickname: target.value})}
              // disabled={!isEditing}
              className="w-full p-2 border border-soft-gray rounded"
              placeholder="This is what people will see as author of your Taps"
            />
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <SiX className="w-6 h-6" />
                <input
                  type="text"
                  value={userProfile?.twitter || ''}
                  onChange={({target}) => setUserProfile({...userProfile, twitter: target.value})}
                  // disabled={!isEditing}
                  className="flex-1 p-2 border border-soft-gray rounded"
                  placeholder="X URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <SiGithub className="w-6 h-6" />
                <input
                  type="text"
                  value={userProfile?.github || ''}
                  onChange={({target}) => setUserProfile({...userProfile, github: target.value})}
                  // disabled={!isEditing}
                  className="flex-1 p-2 border border-soft-gray rounded"
                  placeholder="GitHub URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-6 h-6" />
                <input
                  type="text"
                  value={userProfile?.linkedin || ''}
                  onChange={({target}) => setUserProfile({...userProfile, linkedin: target.value})}
                  // disabled={!isEditing}
                  className="flex-1 p-2 border border-soft-gray rounded"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="flex items-center gap-2">
                <SiInstagram className="w-6 h-6" />
                <input
                  type="text"
                  value={userProfile?.instagram || ''}
                  onChange={({target}) => setUserProfile({...userProfile, instagram: target.value})}
                  // disabled={!isEditing}
                  className="flex-1 p-2 border border-soft-gray rounded"
                  placeholder="Instagram URL"
                />
              </div>
            </div>
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex justify-end gap-4">
            {true ? (
              <>
                {/* <WhiteButton onClick={() => setIsEditing(false)}>
                  Cancel
                </WhiteButton> */}
                <BlackButton onClick={handleSaveProfile}>
                  Save Changes
                </BlackButton>
              </>
            ) : (
              <>
                {/* <BlackButton onClick={() => setIsEditing(true)}>
                  Edit Profile
                </BlackButton> */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Spaces Section */}
      <div className="bg-white border border-soft-gray rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Spaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userSpaces.slice(0, visibleSpaces).map((space) => (
            <div key={space.id} className="border border-soft-gray rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{space.emoji || '🚀'}</span>
                <h3 className="text-lg font-medium">{space.name}</h3>
              </div>
              <p className="text-sm text-gray-600">
                Created on {new Date(space.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        {userSpaces.length > visibleSpaces && (
          <div className="mt-4 flex justify-center">
            <WhiteButton onClick={loadMoreSpaces}>
              Load More Spaces
            </WhiteButton>
          </div>
        )}
      </div>

      {/* Taps Section */}
      <div className="bg-white border border-soft-gray rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Your Taps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userTaps.slice(0, visibleTaps).map((tap) => (
            <div key={tap.id} className="border border-soft-gray rounded-lg p-4">
              <p className="text-lg mb-2">{tap.sections[0]?.fastView || 'No content'}</p>
              <p className="text-sm text-gray-600">
                Created on {new Date(tap.createdAt.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        {userTaps.length > visibleTaps && (
          <div className="mt-4 flex justify-center">
            <WhiteButton onClick={loadMoreTaps}>
              Load More Taps
            </WhiteButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountScreen;