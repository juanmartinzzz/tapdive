import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import NewTapScreen from './screens/NewTapScreen/NewTapScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route
            path="/"
            element={
              <div className="test">
                <Sidebar />
                <div className="test">
                  <Header />
                  <HomeScreen />
                </div>
              </div>
            }
          />

          <Route
            path="/new-tap"
            element={
              <PrivateRoute>
                <div className="">
                  <Sidebar />
                  <div className="">
                    <Header />
                    <NewTapScreen />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
