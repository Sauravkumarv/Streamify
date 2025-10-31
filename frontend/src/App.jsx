import React from "react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import OnboardingPage from "./pages/OnboardingPage";
import toast, { Toaster } from "react-hot-toast";

import { Routes, Route, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

const App = () => {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],

    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res;
    },
    retry: false, //auth check
  });
  const authUser = authData?.user;

  return (
    <div className="h-screen" data-theme="normal">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notification"
          element={authUser ? <NotificationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnboardingPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
