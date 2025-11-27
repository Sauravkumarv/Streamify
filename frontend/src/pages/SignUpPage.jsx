import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";
import { HandshakeIcon } from "lucide-react";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {isPending,error,signupMutation}=useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col bg-gradient-to-b from-gray-900 to-black">
          {/* LOGO */}
          <div className="mb-8 flex items-center justify-start gap-2">
            <svg
              className="w-8 h-8 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <HandshakeIcon cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20" />
              <path d="m8 8 8 8M16 8l-8 8" />
            </svg>
            <span className="text-2xl font-bold text-emerald-500 tracking-wider">
              Frenzy
            </span>
          </div>

          {/* error message */}
          
          {
            error &&(
              <div className="alert alert-error mb-4">
            <span>{error.response.data.message}</span>
          </div>
            )
          }

          <div className="w-full">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Create an Account
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Join Frenzy and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-4">
                {/* fullName */}
                <div className="w-full">
                  <label className="block text-sm text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* email */}
                <div className="w-full">
                  <label className="block text-sm text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="jhon@gmail.com"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* password */}
                <div className="w-full">
                  <label className="block text-sm text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••••"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded bg-gray-800 border-gray-700 text-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    I agree to the{" "}
                    <span className="text-emerald-500 hover:underline cursor-pointer">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-emerald-500 hover:underline cursor-pointer">
                      privacy policy
                    </span>
                  </span>
                </div>
              </div>

              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
                type="button"
                onClick={handleSignup}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-emerald-500 hover:underline font-medium cursor-pointer"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - DECORATIVE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 items-center justify-center p-10">
          <div className="max-w-md text-center space-y-6">
            {/* GIF Illustration */}
            <div className="relative mx-auto">
              <div className="w-72 h-72 mx-auto rounded-full flex items-center justify-center">
                <img
                  src="/i.gif"
                  alt="Language connection illustration"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
              <div
                className="absolute bottom-0 right-0 w-16 h-16 bg-teal-400 rounded-full opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            <div className="space-y-3 text-white">
              <h2 className="text-2xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
