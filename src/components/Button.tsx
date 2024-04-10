const Button = ({ buttonLabel, clickHandler, classes, disabled }) => {
  return (
    <button disabled={disabled} className={`${classes}`} onClick={clickHandler}>
      {buttonLabel}
    </button>
  );
};

export default Button;
