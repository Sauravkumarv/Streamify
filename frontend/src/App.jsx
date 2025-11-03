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
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {

const{isLoading,authUser}=useAuthUser();
  const isAuthenticated=Boolean(authUser);

  const isOnboarded=authUser?.isOnboarded

    if(isLoading ) return <PageLoader/>;

  return (
    <div className="h-screen" data-theme="normal">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated && isOnboarded ?(<HomePage/>):(
            <Navigate to={!isAuthenticated?"/login":"/onboarding"}/>
          )       
           }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notification"
          element={isAuthenticated ? <NotificationPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/onboarding"
          element={isAuthenticated ? (!isOnboarded?<OnboardingPage/>:<Navigate to={"/"}/>):(<Navigate to={"/login"} />)}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
