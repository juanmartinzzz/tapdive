const BlackButton = ({ children, fullWidth, disabled, onClick }) => {
  return (
    <button
      className={`${fullWidth ? 'w-full' : ''} p-4 bg-black text-white rounded-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BlackButton;
