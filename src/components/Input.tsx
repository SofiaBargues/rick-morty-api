const Input = ({ type, placeholder, changeHandeler }) => {
  return (
    <input
      className=" w-full p-2 border-2 rounded-md border-black"
      type={type}
      placeholder={placeholder}
      onChange={changeHandeler}
    />
  );
};

export default Input;
