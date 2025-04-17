import { Helmet } from "react-helmet";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { StarIcon } from "@heroicons/react/24/solid";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useAuth();
  const { darkMode } = useTheme();

  return (
    <>
      <Helmet>
        <title>Favorite | English-Khmer Dictionary</title>
        <meta
          name="description"
          content="View and manage your favorite words."
        />
      </Helmet>

      <div
        className={`max-w-4xl mx-auto px-4 py-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        } min-h-screen`}
      >
        <h1
          className={`text-4xl font-bold text-center ${
            darkMode ? "text-white" : "text-gray-900"
          } mb-8`}
        >
          My Favorite Words
        </h1>

        {favorites.length === 0 ? (
          <div
            className={`text-center ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <p>You haven't added any favorites yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {favorites.map((word) => (
              <div
                key={word.id}
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } p-6 rounded-lg shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {word.word}
                    </h3>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mt-1`}
                    >
                      {word.pronunciation}
                    </p>
                    <p
                      className={`text-lg ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      } mt-2`}
                    >
                      {word.englishMeaning}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromFavorites(word)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <StarIcon className="h-6 w-6" />
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
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
