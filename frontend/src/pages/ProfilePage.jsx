
import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-center space-y-5">
          {/* Avatar */}
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || "U N"}&background=random`}
            alt="avatar"
            className="w-24 h-24 rounded-full shadow-lg border-4 border-blue-200"
          />

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        </div>

        {/* Info */}
        {user ? (
          <div className="mt-6 space-y-4 text-center text-gray-700 text-base sm:text-lg">
            <p>
              <span className="font-semibold text-gray-900">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email:</span> {user.email}
            </p>
            {/* Add more fields if available */}
            {/* <p><span className="font-semibold">Phone:</span> {user.phone}</p> */}
            {/* <p><span className="font-semibold">Role:</span> {user.role}</p> */}
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;




