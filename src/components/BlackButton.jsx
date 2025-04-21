const BlackButton = ({ children, fullWidth, noPadding, disabled, onClick }) => {
  const classes = {
    background: 'bg-black',
    color: 'text-white',
    rounded: 'rounded-full',
    hover: 'hover:opacity-90',
    padding: noPadding ? '' : 'p-4',
    width: fullWidth ? 'w-full' : '',
    cursor: disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  }

  return (
    <button
      className={Object.values(classes).join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BlackButton;
