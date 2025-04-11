import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { darkMode } = useTheme();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    // Update profile without password if no new password is provided
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    if (formData.newPassword) {
      updateData.password = formData.newPassword;
    }

    updateProfile(updateData);
    alert("Profile updated successfully!");
  };

  return (
    <>
      <Helmet>
        <title>Profile | English-Khmer Dictionary</title>
        <meta
          name="description"
          content="Manage your profile settings, including password changes."
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
              Edit Profile
            </h2>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon
                    className={`w-32 h-32 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  />
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Click to upload a new profile picture
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  First Name
                </label>
                <input
                  type="text"
                  required
                  className={`mt-1 block w-full rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  className={`mt-1 block w-full rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  className={`mt-1 block w-full rounded-md ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-4">
                <h3
                  className={`text-lg font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Change Password
                </h3>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    className={`mt-1 block w-full rounded-md ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    className={`mt-1 block w-full rounded-md ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className={`mt-1 block w-full rounded-md ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
