import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPanel: React.FC = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 shadow-lg flex items-center justify-center h-[104px]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">User Authentication</h2>
      {isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full border-2 border-teal-400" />
          <div className="flex-grow">
            <p className="font-bold text-white">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="px-3 py-2 text-sm bg-rose-600/80 hover:bg-rose-600 rounded-md font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <p className="text-gray-400 mb-4 text-center">Log in to control agent permissions.</p>
          <button
            onClick={() => loginWithRedirect()}
            className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors shadow-md"
          >
            Login with Auth0
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPanel;