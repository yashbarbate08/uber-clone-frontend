import React from "react";
import { MdLocalHotel } from "react-icons/md";

const LocationSearchPanel = ({
  suggestions = [],
  setvehiclePanal,
  setShowPanel,
  setpickup,
  setDestination,
  activeField,
}) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setpickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }

    // setvehiclePanal(true);
    // setShowPanel(false);
  };

  return (

    <div className="p-5 ml-1">
      <div className="max-h-98 overflow-y-auto mt-6 pr-1 rounded-xl no-scrollbar">
        {suggestions.length === 0 ? (
          <div className="text-gray-500 text-sm px-2">No suggestions found</div>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center cursor-pointer select-none mb-3 gap-3 px-2 py-2 bg-white rounded-xl border border-zinc-200 hover:border-black transition"
            >
              {/* Icon container */}
              <div className="bg-[#eee] h-9 w-9 flex items-center justify-center rounded-full text-gray-600 flex-shrink-0">
                <MdLocalHotel size={18} />
              </div>

              {/* Address text */}
              <h4 className="text-sm font-medium text-gray-800 break-words">
                {suggestion.description}
              </h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
