const FancyButton = ({ children, fullWidth, noPadding, disabled, onClick }) => {
  const classes = {
    background: 'bg-white',
    color: 'text-black',
    border: 'border border-gray-400',
    shadow: 'flashy-shadow',
    rounded: 'rounded-full',
    padding: noPadding ? '' : 'p-4',
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
