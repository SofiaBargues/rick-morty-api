const Error = ({ searchTermCharacters }) => {
  return (
    <p className=" text-xl bg-red-400 p-4 text-black font-bold">
      Ooops!! No result found for{" "}
      <span className="italic">{searchTermCharacters}</span>
    </p>
  );
};

export default Error;
