const FancyButton = ({ children, fullWidth, padding = '4', disabled, onClick }) => {
  const classes = {
    padding: `p-${padding}`,
    background: 'bg-white',
    color: 'text-black',
    border: 'border border-gray-400',
    shadow: 'flashy-shadow',
    rounded: 'rounded-full',
    cursor: disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    width: fullWidth ? 'w-full' : '',
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

export default FancyButton;
