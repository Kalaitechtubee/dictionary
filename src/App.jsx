
import React, { useState } from "react";
import axios from "axios";
import { IoBookOutline } from "react-icons/io5";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [error, setError] = useState("");

  const dictionary = async (wordToSearch) => {
    const options = {
      method: "GET",
      url: `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary`,
      params: { word: wordToSearch },
      headers: {
        "x-rapidapi-key": "3d88784c5amsh44e9a1be97ec29bp1bde41jsn86c8fd033dca",
        "x-rapidapi-host": "dictionary-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const result = response.data;

      if (result.word && result.definition) {
        setWord(result.word);
        setDefinition(result.definition);
        setError("");
      } else {
        setError("Word not found or an error occurred.");
      }
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message || "Failed to fetch word."}`);
      } else if (err.request) {
        setError("Error: No response from the server. Please try again later.");
      } else {
        setError("Error: An unexpected error occurred.");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      setError("Please enter a word to search.");
      return;
    }
    dictionary(searchInput);
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3">
            <span className="text-blue-600 ">  <IoBookOutline style={{ fontSize: "50px" }} /></span>
            <span className="self-center text-2xl font-semibold dark:text-white">
          
              Dictionary
            </span>
          </a>
        </div>
      </nav>

      {/* Search Form */}
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="search"
            id="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="block w-full p-4 ps-10 text-2xl font-thin text-white border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Enter a word..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {/* Word and Definition Display */}
      <div className="p-32 mx-auto mt-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <label
              htmlFor="word"
              className="block mb-2 w-36 text-2xl font-bold text-gray-900 dark:text-white"
            >
              Word:
            </label>
            <p
              id="word"
              className="p-2.5 font-bold text-2xl text-white bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              {word || "No word searched yet."}
            </p>

            <label
              htmlFor="definition"
              className="block mt-4 mb-2 text-2xl py-5 font-bold text-gray-900 dark:text-white"
            >
              Definition Of: {searchInput}
            </label>
            <textarea
              id="definition"
              rows="4"
              className="block p-2.5 w-full py-28 size-60 font-serif text-white bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
              readOnly
              value={definition || "No definition available."}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
