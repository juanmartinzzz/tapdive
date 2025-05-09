import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import firestore from "../../integrations/firestore";
import WhiteButton from "../../components/WhiteButton";
import BlackButton from "../../components/BlackButton";
import { CircleAlert, EyeIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import FullView from "./FullView";
import { SiX } from "@icons-pack/react-simple-icons";
import FastView from "./FastView";

const EditableSection = ({ section, index, onUpdate, isEditing }) => {
  const [isFullViewVisible, setIsFullViewVisible] = useState(false);

  if (!isEditing) {
    return (
      <div className="flex flex-col items-center">
        <div className="md:w-xl">
          <div className="flex justify-between items-center gap-2">
            <FastView content={section.fastView} index={index} />
          </div>

          {!isFullViewVisible ? (
            <div className="mt-8 flex justify-center">
              <BlackButton onClick={() => setIsFullViewVisible(!isFullViewVisible)}>
                <div className="flex items-center gap-2">
                  Dive In
                </div>
              </BlackButton>
            </div>
          ) : (
            <div className="mt-8">
              <FullView content={section.fullView} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fast View Content
          </label>

          <input
            type="text"
            value={section.fastView}
            onChange={(e) => onUpdate(index, 'fastView', e.target.value)}
            className="w-full p-3 text-4xl font-bold border border-soft-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write a clear, concise message"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full View Content
          </label>
          <textarea
            value={section.fullView}
            onChange={(e) => onUpdate(index, 'fullView', e.target.value)}
            className="w-full min-h-[150px] p-3 text-lg border border-soft-gray rounded resize-y focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Add more context or support your main message"
          />
        </div>
      </div>
    </div>
  );
};

const TapScreen = () => {
  const { tapId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [tap, setTap] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSections, setEditedSections] = useState([]);

  useEffect(() => {
    firestore.tap.get({id: tapId}).then(tap => {
      setTap(tap);
      setEditedSections(tap.sections);
    });
  }, [tapId]);

  const handleSectionUpdate = (index, field, value) => {
    const newSections = [...editedSections];
    newSections[index] = { ...newSections[index], [field]: value };
    setEditedSections(newSections);
  };

  const handleAddSection = () => {
    setEditedSections([...editedSections, { fastView: '', fullView: '' }]);
  };

  const handleSave = async () => {
    try {
      await firestore.tap.upsert({data: {...tap, sections: editedSections}});
      setTap({ ...tap, sections: editedSections });

      setIsEditing(false);
    } catch (error) {
      // TODO: show error to user
      console.error('Error saving tap:', error);
    }
  };

  const handleShareOnX = async () => {
    // Copy the first section's fastView to clipboard
    navigator.clipboard.writeText(tap.sections[0].fastView);
    /** @TODO create constants for routes and reference those, instead of using strings */
    const tapUrl = `${import.meta.env.VITE_APP_URL}/tap/${tap.id}`;

    const message = `${encodeURIComponent(tap.sections[0].fastView)} - ${tapUrl}`;

    // Open the X share dialog
    window.open(`https://x.com/intent/tweet?text=${message}`, '_blank');
  };

  const handleArchive = async () => {
    try {
      await firestore.tap.archive({data: tap});
      navigate('/');
    } catch (error) {
      console.error('Error archiving tap:', error);
    }
  };

  const handleToggleIsPublic = async () => {
    // Upsert a tap and flip its isPublic value
    await firestore.tap.upsert({data: { ...tap, isPublic: !tap.isPublic }});
    setTap({ ...tap, isPublic: !tap.isPublic });

    // Reload the page
    window.location.reload();
  };

  if (!tap) return null;

  return (
    <div className="py-12 px-8">
      {editedSections.map((section, index) => (
        <div key={index} className="mb-12">
          <EditableSection
            tap={tap}
            section={section}
            index={index}
            onUpdate={handleSectionUpdate}
            isEditing={isEditing}
            currentUser={currentUser}
            handleToggleIsPublic={handleToggleIsPublic}
          />
        </div>
      ))}

      {/* Post-tap options */}
      {currentUser && (
        <div className="mt-8 flex gap-4 justify-center">
          {isEditing ? (
            <>
              <WhiteButton onClick={handleAddSection}>
                Add more
              </WhiteButton>

              <BlackButton onClick={handleSave}>
                Save Changes
              </BlackButton>

              <WhiteButton onClick={() => {
                setEditedSections(tap.sections);
                setIsEditing(false);
              }}>
                <div className="flex items-center gap-2">
                  Cancel <CircleAlert size={24} />
                </div>
              </WhiteButton>
            </>
          ) : (
            <>
              <WhiteButton onClick={() => setIsEditing(true)}>
                <div className="flex items-center gap-2">
                  Edit
                </div>
              </WhiteButton>

              <WhiteButton onClick={handleToggleIsPublic}>
                {(!tap.isPublic) ? 'Publish' : 'Make Private'}
              </WhiteButton>

              <WhiteButton onClick={handleShareOnX}>
                <SiX size={24} />
              </WhiteButton>

              <BlackButton onClick={handleArchive}>
                <div className="flex items-center gap-2">
                  Archive
                </div>
              </BlackButton>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default TapScreen;