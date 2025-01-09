import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Import your Redux store
import Landing from "./components/landing";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import ContactUs from "./pages/contactUs";
import AboutUs from "./pages/aboutUs";
import History from "./components/history";
import Dashboard from "./components/dashboard";
import CommonRoomPage from "./pages/commonRoomPage";
import ConfirmInvitePage from "./pages/confirmInvitePage";
import "./App.css";
import Navbar from "./components/navbar"; 

function App() {
  return (
    <Provider store={store}> {/* Wrap everything with Provider */}
      <Router>
        <Navbar />
        <div className="bg-white p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/common-rooms" element={<CommonRoomPage />} />
            <Route path="/confirm-invite/:roomId/:roomToken" element={<ConfirmInvitePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
