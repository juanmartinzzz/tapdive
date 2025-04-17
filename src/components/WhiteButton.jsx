const WhiteButton = ({ children, disabled, onClick }) => {
  return (
    <button
      className={`w-full p-4 bg-white text-black border border-gray-500 shadow-lg rounded-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default WhiteButton;
