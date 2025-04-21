const BlackButton = ({ children, fullWidth, padding = '4', disabled, onClick }) => {
  const classes = {
    padding: `p-${padding}`,
    background: 'bg-black',
    color: 'text-white',
    rounded: 'rounded-full',
    hover: 'hover:opacity-90',
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
