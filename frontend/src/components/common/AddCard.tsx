import React from "react";

interface AddCardProps {
  onClick: () => void;
  label: string;
}

export const AddCard: React.FC<AddCardProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full p-4 bg-gray-800 rounded-lg shadow-lg 
        transition-all duration-200 
        hover:bg-gray-700 hover:shadow-xl hover:scale-[1.02]
        flex flex-col items-center justify-center
        min-h-[200px] // Pour correspondre à la hauteur approximative des autres cartes
        border-2 border-dashed border-gray-600
        group
      "
    >
      <div className="p-2.5 rounded-lg bg-gray-700 group-hover:bg-gray-600 transition-colors">
        <i className="text-3xl text-gray-400 transition-colors group-hover:text-white material-icons-outlined">
          add
        </i>
      </div>
      <span className="mt-4 text-gray-400 transition-colors group-hover:text-white">
        {label}
      </span>
    </button>
  );
};

export default AddCard;
