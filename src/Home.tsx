import { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";
import CardsList from "./components/CardsList.tsx";
import Error from "./components/Error.tsx";

const Home = () => {
  const [initData, setInitData] = useState();
  const [characters, setCharacters] = useState();
  const [searchTermCharacters, setSearchTermCharacters] = useState();
  const [noResults, setNoResults] = useState(false);
  const [totalResults, setTotalResults] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const searchTerm = (e) => {
    setSearchTermCharacters(e.target.value);
    searchCharacters();
  };

  const searchCharacters = () => {
    if (searchTermCharacters) {
      const searchResults = initData.filter((character) =>
        character.name
          .toLowerCase()
          .includes(searchTermCharacters.toLowerCase())
      );
      setCharacters(searchResults);
      setNoResults(searchResults.length === 0);
    } else {
      setCharacters(initData);
    }
  };

  const getChatacter = async (page = 1) => {
    try {
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const response = await data.json();
      setCharacters(response.results);
      setInitData(response.results);
      setTotalResults(response.info.count);
      setTotalPages(response.info.pages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChatacter();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getChatacter(newPage);
  };

  return (
    <section className="container mx-auto">
      <Header />
      <Input
        type="search"
        placeholder="type your character..."
        changeHandeler={searchTerm}
      />
      {totalResults && (
        <p className="mt-4 ">
          Total characters are:{" "}
          <span className=" font-black">{totalResults}</span>
        </p>
      )}
      {noResults ? (
        <Error searchTermCharacters={searchTermCharacters} />
      ) : (
        <CardsList characters={characters} />
      )}
      {totalPages && (
        <div className="flex gap-2 my-4 justify-center items-baseline">
          <Button
            classes={
              currentPage === 1
                ? "bg-gray-400 p-2 rounded-md text-white"
                : "bg-black text-white p-2 rounded-md"
            }
            clickHandler={() => handlePageChange(currentPage - 1)}
            buttonLabel="prev"
            disabled={currentPage === 1}
          />
          <p>
            Page {currentPage} of {totalPages}{" "}
          </p>
          <Button
            clickHandler={() => handlePageChange(currentPage + 1)}
            buttonLabel="next"
            classes={
              currentPage === totalPages
                ? "bg-gray-400 p-2 rounded-md text-white"
                : "bg-black text-white p-2 rounded-md"
            }
            disabled={currentPage === totalPages}
          />
        </div>
      )}
      <Footer />
    </section>
  );
};
export default Home;
