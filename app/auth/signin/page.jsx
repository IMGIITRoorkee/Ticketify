"use client";

import React from "react";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark gray-100">
      <div className="p-8 border rounded-lg shadow-lg w-96 bg-dark gray">
        <h1 className="text-3xl mb-6 text-center font-semibold text-white-700">Sign In</h1>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-4 rounded-lg flex items-center justify-center space-x-3 transform transition duration-300 hover:scale-105 shadow-lg"
        >
          <img
            src="/googlelogo.png"
            alt="Google"
            className="w-6 h-6"
          />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
