function Button({
  className,
  text,
  type,
  dismiss,
  handleClick,
  toggle,
  target,
  label,
}) {
  return (
    <button
      className={className}
      type={type}
      data-bs-dismiss={dismiss}
      data-bs-toggle={toggle}
      data-bs-target={target}
      aria-label={label}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;
