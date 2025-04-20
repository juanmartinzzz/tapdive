import { useState, useEffect } from "react";
import firestore from "../../integrations/firestore";

const SpaceTaps = ({spaceId}) => {
  const [taps, setTaps] = useState([]);

  useEffect(() => {
    firestore.tap.getBySpaceId({spaceId}).then(taps => {
      setTaps(taps);
    });
  }, [spaceId]);

  return (
    <div className="flex flex-col gap-2">
      {taps.map((tap) => (
        <div key={tap.id}>
          {tap.sections[0].fastView}
        </div>
      ))}
    </div>
  );
};

export default SpaceTaps;