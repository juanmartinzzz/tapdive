import { useEffect, useState } from "react";
import string from "../../utils/string";
import firestore from "../../integrations/firestore";

const HeaderSection = ({ tap }) => {
  const [authorProfile, setAuthorProfile] = useState(null);

  const [showInstructions, setShowInstructions] = useState(() => {
    // localStorage.removeItem('tapInstructionsDismissed');
    return !localStorage.getItem('tapInstructionsDismissed');
  });

  const handleDismissInstructions = () => {
    localStorage.setItem('tapInstructionsDismissed', 'true');
    setShowInstructions(false);
  };

  useEffect(() => {
    firestore.user.getById({id: tap.userId}).then((user) => {
      setAuthorProfile(user);
    });
  }, [tap]);

  console.log({tap});

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">By {authorProfile?.nickname || 'Anonymous'}</h2>
        <div className="text-gray-600">
          <p>Created on {string.getTapDate({timestamp: tap.createdAt})}</p>
          {tap.updatedAt && tap.updatedAt !== tap.createdAt && (
            <p>Last updated on {string.getTapDate({timestamp: tap.updatedAt})}</p>
          )}
        </div>
      </div>

      {showInstructions && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold mb-4">Welcome to TapDive! 🏄‍♂️</h3>
          <p className="text-lg mb-4 leading-tight">
            You're about to experience something special: the power of simple messages. In Fast View, you'll find the essence of this tap - Quick. Impactful. Straight to the point.
          </p>
          <p className="text-lg mb-4 leading-tight">
            But tap "Dive In" to unlock the full story and open a treasure chest of insights. 🏴‍☠️
          </p>
          <button
            onClick={handleDismissInstructions}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all cursor-pointer"
          >
            Ok, got it! ✨
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;