import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

export default function AddWord() {
  const { darkMode } = useTheme();
  const { addWord } = useAuth();
  const navigate = useNavigate();
  const [wordData, setWordData] = useState({
    word: "",
    pronunciation: "",
    englishMeaning: "",
    examples: ["", ""],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWord = addWord(wordData);
    console.log("New word added:", newWord);
    navigate("/");
  };

  const handleExampleChange = (index, value) => {
    const newExamples = [...wordData.examples];
    newExamples[index] = value;
    setWordData({ ...wordData, examples: newExamples });
  };

  return (
    <>
      <Helmet>
        <title>Add Word | English-Khmer Dictionary</title>
        <meta
          name="description"
          content="Add a new word/idioms/phrases to the English-Khmer dictionary."
        />
      </Helmet>

      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        } py-12 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-8 rounded-lg shadow-md`}
          >
            <h2
              className={`text-3xl font-bold text-center ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-8`}
            >
              Add New Word
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="word"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Word (in Khmer)
                </label>
                <input
                  type="text"
                  id="word"
                  required
                  className={`mt-1 block w-full rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={wordData.word}
                  onChange={(e) =>
                    setWordData({ ...wordData, word: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="pronunciation"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Pronunciation
                </label>
                <input
                  type="text"
                  id="pronunciation"
                  required
                  className={`mt-1 block w-full rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={wordData.pronunciation}
                  onChange={(e) =>
                    setWordData({ ...wordData, pronunciation: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="englishMeaning"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  English Meaning
                </label>
                <input
                  type="text"
                  id="englishMeaning"
                  required
                  className={`mt-1 block w-full rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={wordData.englishMeaning}
                  onChange={(e) =>
                    setWordData({ ...wordData, englishMeaning: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Examples
                </label>
                {wordData.examples.map((example, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      required
                      className={`block w-full rounded-md ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                      placeholder={`Example ${index + 1}`}
                      value={example}
                      onChange={(e) =>
                        handleExampleChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Word
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
