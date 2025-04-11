import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

export default function Admin() {
  const { darkMode } = useTheme();
  const {
    getAllUsers,
    deleteUser,
    suspendUser,
    words,
    deleteWord,
    updateWord,
    editingWord,
    startEditingWord,
    stopEditingWord,
  } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [editForm, setEditForm] = useState({
    word: "",
    pronunciation: "",
    englishMeaning: "",
    examples: ["", ""],
  });

  const users = getAllUsers();

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
    }
  };

  const handleSuspendUser = (userId) => {
    if (window.confirm("Are you sure you want to suspend this user?")) {
      suspendUser(userId);
    }
  };

  const handleDeleteWord = (wordId) => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      deleteWord(wordId);
    }
  };

  const handleEditWord = (word) => {
    setEditForm(word);
    startEditingWord(word);
  };

  const handleSaveEdit = () => {
    updateWord(editingWord.id, editForm);
    stopEditingWord();
    setEditForm({
      word: "",
      pronunciation: "",
      englishMeaning: "",
      examples: ["", ""],
    });
  };

  const handleCancelEdit = () => {
    stopEditingWord();
    setEditForm({
      word: "",
      pronunciation: "",
      englishMeaning: "",
      examples: ["", ""],
    });
  };

  const handleExampleChange = (index, value) => {
    const newExamples = [...editForm.examples];
    newExamples[index] = value;
    setEditForm({ ...editForm, examples: newExamples });
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | English-Khmer Dictionary</title>
        <meta
          name="description"
          content="Admin dashboard for managing users and content."
        />
      </Helmet>

      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } p-6`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "users"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("words")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "words"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Words
            </button>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                User Management
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="text-yellow-600 hover:text-yellow-900 mr-3"
                          >
                            {user.status === "active" ? "Suspend" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Words Tab */}
          {activeTab === "words" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Word Management
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Word
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        English Meaning
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {words.map((word) => (
                      <tr key={word.id}>
                        {editingWord?.id === word.id ? (
                          <td colSpan="4" className="px-6 py-4">
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Word
                                </label>
                                <input
                                  type="text"
                                  value={editForm.word}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      word: e.target.value,
                                    })
                                  }
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Pronunciation
                                </label>
                                <input
                                  type="text"
                                  value={editForm.pronunciation}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      pronunciation: e.target.value,
                                    })
                                  }
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  English Meaning
                                </label>
                                <input
                                  type="text"
                                  value={editForm.englishMeaning}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      englishMeaning: e.target.value,
                                    })
                                  }
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Examples
                                </label>
                                {editForm.examples.map((example, index) => (
                                  <input
                                    key={index}
                                    type="text"
                                    value={example}
                                    onChange={(e) =>
                                      handleExampleChange(index, e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  />
                                ))}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleSaveEdit}
                                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {word.word}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {word.englishMeaning}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                              {word.createdBy}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button
                                onClick={() => handleEditWord(word)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteWord(word.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
