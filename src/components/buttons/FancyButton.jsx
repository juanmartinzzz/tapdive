const FancyButton = ({ children, fullWidth, disabled, onClick }) => {
  return (
    <button
      className={`${fullWidth ? 'w-full' : ''} p-4 bg-white text-black border border-gray-400 flashy-shadow rounded-full ${disabled ? 'cursor-not-allowed' : ''} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FancyButton;
