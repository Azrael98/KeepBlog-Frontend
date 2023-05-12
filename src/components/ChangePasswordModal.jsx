import React, { useState } from "react";

const ChangePasswordModal = ({ isOpen, onClose, token }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/changePassword`,
        {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            auth: "Bearer " + token,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({oldPass:currentPassword, newPass:confirmPassword}),
        }
      );
    }
    onClose(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white w-96 rounded-lg z-20">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block font-semibold mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-4 py-2 ml-2 text-gray-600 font-semibold rounded hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
