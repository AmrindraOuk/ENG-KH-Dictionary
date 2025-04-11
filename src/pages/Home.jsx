import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { recommendedWords } from "../data/dictionaryData";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  const [showRecommended, setShowRecommended] = useState(true);
  const { user, favorites, addToFavorites, removeFromFavorites, words } =
    useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (term) => {
    const allWords = [...recommendedWords, ...words];
    const results = allWords.filter(
      (word) =>
        word.word.toLowerCase().includes(term.toLowerCase()) ||
        word.englishMeaning.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
    setShowRecommended(false);
  };

  const handleFavorite = (word) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const isFavorite = favorites.some((fav) => fav.id === word.id);
    if (isFavorite) {
      removeFromFavorites(word);
    } else {
      addToFavorites(word);
    }
  };

  const handleAddWord = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/add-word");
  };

  const renderWord = (word) => {
    const isFavorite = favorites.some((fav) => fav.id === word.id);

    return (
      <div
        key={word.id}
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6 rounded-lg shadow-md mb-4`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-800"
              } mb-2 text-2xl font-bold`}
            >
              {word.englishMeaning}
            </p>

            <h3
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {word.word}
            </h3>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}
            >
              {word.pronunciation}
            </p>
          </div>
          <button
            onClick={() => handleFavorite(word)}
            className="text-yellow-500 hover:text-yellow-600"
          >
            {isFavorite ? (
              <StarIconSolid className="h-6 w-6" />
            ) : (
              <StarIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="mt-4">
          <h4
            className={`font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Examples:
          </h4>
          <ul className="mt-2 space-y-2">
            {word.examples.map((example, index) => (
              <li
                key={index}
                className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const allWords = [...recommendedWords, ...words];

  return (
    <div
      className={`max-w-4xl mx-auto px-4 py-8 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <h1
        className={`text-4xl font-bold text-center ${
          darkMode ? "text-white" : "text-gray-900"
        } mb-8`}
      >
        English-Khmer Dictionary
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-8">
        {searchResults?.length === 0 ? (
          <div
            className={`text-center ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <p>No results found. Would you like to contribute this word?</p>
            <button
              onClick={handleAddWord}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Add New Word
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {showRecommended ? (
              <>
                <h2
                  className={`text-2xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  } mb-4`}
                >
                  All Words
                </h2>
                {allWords.map(renderWord)}
              </>
            ) : (
              searchResults?.map(renderWord)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
