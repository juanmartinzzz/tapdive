import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firestore from '../../integrations/firestore';
import { useAuth } from '../../contexts/AuthContext';
import BlackButton from '../../components/BlackButton';
import WhiteButton from '../../components/WhiteButton';
import { useSpace } from '../../contexts/SpaceContext';

const NewTapScreen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { currentSpace } = useSpace();
  const [sections, setSections] = useState([{ fastView: '', fullView: '' }]);

  const addSection = () => {
    setSections([...sections, { fastView: '', fullView: '' }]);
  };

  const updateSection = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    console.log('Submitting tap:', sections);
    const data = {sections, userId: currentUser.uid};
    if(currentSpace) {
      data.spaceId = currentSpace.id;
    }

    const tapRef = await firestore.tap.upsert({data});
    const userTapRef = await firestore.userTapId.upsert({userId: currentUser.uid, data: {tapId: tapRef.id}});

    if(tapRef.id && userTapRef.id) {
      navigate(`/tap/${tapRef.id}`);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-[800px] mx-auto">
        <div className="mb-8 text-center text-gray-600">
          <p className="mb-2">Create engaging content that captures attention and delivers value.</p>
          <p className="text-sm">Each section can include both a quick overview and detailed content.</p>
        </div>

        <div>
          {sections.map((section, index) => (
            <div key={index} className="mb-6 p-6 section-border">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fast View Content
                </label>
                <input
                  type="text"
                  placeholder="Write a clear, concise message (text or video URL)"
                  value={section.fastView}
                  onChange={({ target }) => updateSection(index, 'fastView', target.value)}
                  className="w-full p-3 text-xl font-serif border border-soft-gray rounded"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Keep it short and impactful - Remember: most of your audience will only see this!
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full View Content (Optional)
                </label>
                <textarea
                  placeholder="Add more context or support your main message for those who dive deeper (text or video URL)"
                  value={section.fullView}
                  onChange={({ target }) => updateSection(index, 'fullView', target.value)}
                  className="w-full min-h-[150px] p-3 text-base font-sans border border-soft-gray rounded resize-y"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This is where you can share your complete message, insights, or story.
                </p>
              </div>
            </div>
          ))}

          <div className="flex gap-4 justify-end mt-8">
            <WhiteButton
              type="button"
              onClick={addSection}
              className="px-6 py-3 rounded text-base font-medium cursor-pointer transition-opacity border border-soft-gray hover:opacity-90"
            >
              Add more
            </WhiteButton>

            <BlackButton
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 rounded text-base font-medium cursor-pointer transition-opacity bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
            >
              Create Tap
            </BlackButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTapScreen;